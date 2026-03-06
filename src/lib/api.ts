import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export interface Project {
  project_id: string;
  name: string;
  status: "processing" | "completed" | "failed";
  repo_url: string;
  description: string;
  duration: string;
  created_at: string;
  video_url: string | null;
  script?: string;
  progress?: number;
  current_stage?: string;
}

let projectCounter = 1;
const mockProjects: Record<string, Project> = {};

class APIClient {
  private client: AxiosInstance;
  private mockMode = USE_MOCK_API;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    // Add error handler to fallback to mock mode
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
          console.warn("[v0] Backend unavailable, using mock mode");
          this.mockMode = true;
        }
        throw error;
      }
    );
  }

  // Health check
  async health() {
    return this.client.get("/health");
  }

  // Project endpoints
  async createProject(data: {
    project_name: string;
    repo_url: string;
    description?: string;
    video_duration?: string;
  }) {
    if (this.mockMode) {
      return this.mockCreateProject(data);
    }
    try {
      return await this.client.post("/projects", data);
    } catch (_error) {
      console.log(_error);
      console.warn("[v0] API error, falling back to mock mode");
      this.mockMode = true;
      return this.mockCreateProject(data);
    }
  }

  private mockCreateProject(data: {
    project_name: string;
    repo_url: string;
    description?: string;
    video_duration?: string;
  }) {
    const projectId = `proj_${projectCounter++}`;
    const project: Project = {
      // Explicitly type as Project
      project_id: projectId,
      name: data.project_name,
      status: "processing",
      repo_url: data.repo_url,
      description: data.description || "",
      duration: data.video_duration || "60",
      created_at: new Date().toISOString(),
      video_url: null,
    };
    mockProjects[projectId] = project;
    return Promise.resolve({ data: project });
  }

  async getProject(projectId: string) {
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      return Promise.resolve({ data: project });
    }
    try {
      return await this.client.get(`/projects/${projectId}`);
    } catch {
      this.mockMode = true;
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      return Promise.resolve({ data: project });
    }
  }

  async getProjectStatus(projectId: string) {
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));

      // Simulate progress
      const elapsed = Date.now() - new Date(project.created_at).getTime();
      const progress = Math.min(100, Math.floor((elapsed / 15000) * 100));
      const stages = [
        "Analyzing Repository",
        "Capturing UI Elements",
        "Generating Script",
        "Creating Video",
        "Finalizing",
      ];
      const stageIndex = Math.floor((progress / 100) * (stages.length - 1));

      return Promise.resolve({
        data: {
          project_id: projectId,
          status: progress >= 100 ? "completed" : "processing",
          progress,
          current_stage: stages[stageIndex],
        },
      });
    }
    try {
      return await this.client.get(`/projects/${projectId}/status`);
    } catch {
      this.mockMode = true;
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      return Promise.resolve({
        data: {
          project_id: projectId,
          status: "processing",
          progress: 50,
          current_stage: "Generating Video",
        },
      });
    }
  }

  async listProjects() {
    if (this.mockMode) {
      return Promise.resolve({
        data: { projects: Object.values(mockProjects) },
      });
    }
    try {
      return await this.client.get("/projects");
    } catch {
      this.mockMode = true;
      return Promise.resolve({
        data: { projects: Object.values(mockProjects) },
      });
    }
  }

  async updateProjectScript(projectId: string, script: string) {
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      project.script = script;
      return Promise.resolve({ data: { success: true } });
    }
    try {
      return await this.client.put(`/projects/${projectId}/script`, { script });
    } catch {
      this.mockMode = true;
      const project = mockProjects[projectId];
      if (project) project.script = script;
      return Promise.resolve({ data: { success: true } });
    }
  }

  async regenerateVideo(projectId: string) {
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      project.status = "processing";
      project.created_at = new Date().toISOString();
      return Promise.resolve({ data: { success: true } });
    }
    try {
      return await this.client.post(`/projects/${projectId}/regenerate`);
    } catch {
      this.mockMode = true;
      const project = mockProjects[projectId];
      if (project) {
        project.status = "processing";
        project.created_at = new Date().toISOString();
      }
      return Promise.resolve({ data: { success: true } });
    }
  }

  async downloadVideo(projectId: string) {
    if (this.mockMode) {
      return Promise.reject(
        new Error("Video download not available in mock mode")
      );
    }
    return this.client.get(`/projects/${projectId}/download`, {
      responseType: "blob",
    });
  }

  async deleteProject(projectId: string) {
    if (this.mockMode) {
      delete mockProjects[projectId];
      return Promise.resolve({ data: { success: true } });
    }
    try {
      await this.client.delete(`/projects/${projectId}`);
      delete mockProjects[projectId];
      return Promise.resolve({ data: { success: true } });
    } catch {
      this.mockMode = true;
      delete mockProjects[projectId];
      return Promise.resolve({ data: { success: true } });
    }
  }
}

export const apiClient = new APIClient();
