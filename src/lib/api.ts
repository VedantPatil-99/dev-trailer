import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://v0-dev-trailer.vercel.app/api";
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export interface TrailerDataPayload {
  projectName: string;
  primaryColor: string;
  assets: { screenshotUrl: string; voiceoverUrl?: string };
  scenes: Array<{
    script: string;
    animationStyle: string;
    boundingBox: { x: number; y: number; width: number; height: number };
  }>;
}

export interface Project {
  project_id: string;
  name: string;
  status: "processing" | "completed" | "failed";
  repo_url: string;
  live_url?: string;
  description: string;
  duration: string;
  created_at: string;
  video_url: string | null;
  script?: string;
  trailer_data?: TrailerDataPayload | null;
  progress?: number;
  current_stage?: string;
}

let projectCounter = 1;
const mockProjects: Record<string, Project> = {};

const STAGES = [
  "Analyzing Repository",
  "Capturing UI Elements",
  "Generating Script",
  "Creating Video",
  "Finalizing",
];

function simulateProgress(createdAt: string) {
  const elapsed = Date.now() - new Date(createdAt).getTime();
  const progress = Math.min(100, Math.floor((elapsed / 15000) * 100));
  const stageIndex = Math.floor((progress / 100) * (STAGES.length - 1));
  return {
    progress,
    status: (progress >= 100 ? "completed" : "processing") as
      | "processing"
      | "completed",
    current_stage: STAGES[stageIndex],
  };
}

async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<{ status: number; data?: T; useSupabase?: boolean }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
      credentials: "include",
    });
    const data = res.ok ? await res.json() : undefined;
    return { status: res.status, data, useSupabase: res.status !== 501 };
  } catch {
    return { status: 500 };
  }
}

class APIClient {
  private client: AxiosInstance;
  private mockMode = USE_MOCK_API;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    });
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
          this.mockMode = true;
        }
        throw error;
      }
    );
  }

  private generateFallbackProject(projectId: string): Project {
    return {
      project_id: projectId,
      name: "Restored Project (Dev Mode)",
      status: "processing",
      repo_url: "https://github.com/mock/restored",
      live_url: "https://v0-dev-trailer.vercel.app",
      description: "Restored after dev refresh.",
      duration: "60",
      created_at: new Date().toISOString(),
      video_url: null,
    };
  }

  async health() {
    return this.client.get("/health");
  }

  async createProject(data: {
    project_name: string;
    repo_url: string;
    live_url?: string;
    description?: string;
    video_duration?: string;
  }) {
    const { status, data: resData } = await fetchApi<{ data: Project }>(
      "/api/projects",
      { method: "POST", body: JSON.stringify(data) }
    );
    if (status === 200 && resData?.data) {
      return { data: resData.data };
    }
    if (status === 501 || !resData) {
      return this.mockCreateProject(data);
    }
    throw new Error(
      (resData as { error?: string })?.error ?? "Failed to create"
    );
  }

  private mockCreateProject(data: {
    project_name: string;
    repo_url: string;
    live_url?: string;
    description?: string;
    video_duration?: string;
  }) {
    const projectId = `proj_${projectCounter++}`;
    const project: Project = {
      project_id: projectId,
      name: data.project_name,
      status: "processing",
      repo_url: data.repo_url,
      live_url: data.live_url,
      description: data.description ?? "",
      duration: data.video_duration ?? "60",
      created_at: new Date().toISOString(),
      video_url: null,
    };
    mockProjects[projectId] = project;
    return Promise.resolve({ data: project });
  }

  async getProject(projectId: string) {
    const { status, data: resData } = await fetchApi<{ data: Project }>(
      `/api/projects/${projectId}`
    );
    if (status === 200 && resData?.data) {
      return { data: resData.data };
    }
    if (status === 501 || status === 404) {
      let project = mockProjects[projectId];
      if (!project) {
        project = this.generateFallbackProject(projectId);
        mockProjects[projectId] = project;
      }
      return { data: project };
    }
    throw new Error((resData as { error?: string })?.error ?? "Failed to load");
  }

  async getProjectStatus(projectId: string) {
    const { status, data: resData } = await fetchApi<{ data: Project }>(
      `/api/projects/${projectId}`
    );
    if (status === 200 && resData?.data) {
      const p = resData.data;
      const sim =
        p.status === "completed"
          ? {
              progress: 100,
              current_stage: "Finalizing",
              status: "completed" as const,
            }
          : simulateProgress(p.created_at);
      const effectiveStatus =
        p.trailer_data != null || p.status === "completed"
          ? "completed"
          : sim.status;
      return {
        data: {
          project_id: projectId,
          status: effectiveStatus,
          progress: p.status === "completed" ? 100 : sim.progress,
          current_stage: sim.current_stage,
        },
      };
    }
    if (this.mockMode) {
      let project = mockProjects[projectId];
      if (!project) {
        project = this.generateFallbackProject(projectId);
        mockProjects[projectId] = project;
      }
      const sim = simulateProgress(project.created_at);
      return {
        data: {
          project_id: projectId,
          status: sim.status,
          progress: sim.progress,
          current_stage: sim.current_stage,
        },
      };
    }
    try {
      return await this.client.get(`/projects/${projectId}/status`);
    } catch {
      this.mockMode = true;
      const project =
        mockProjects[projectId] ?? this.generateFallbackProject(projectId);
      mockProjects[projectId] = project;
      const sim = simulateProgress(project.created_at);
      return { data: { project_id: projectId, ...sim } };
    }
  }

  async listProjects() {
    const { status, data: resData } = await fetchApi<{
      projects: Project[];
      useSupabase?: boolean;
    }>("/api/projects");
    if (status === 200 && resData?.projects) {
      return { data: { projects: resData.projects } };
    }
    if (status === 501 || status === 401) {
      return { data: { projects: Object.values(mockProjects) } };
    }
    throw new Error((resData as { error?: string })?.error ?? "Failed to list");
  }

  async updateProjectScript(projectId: string, script: string) {
    const { status } = await fetchApi(`/api/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ script }),
    });
    if (status === 200) {
      return { data: { success: true } };
    }
    if (status === 501 && this.mockMode) {
      const project = mockProjects[projectId];
      if (project) project.script = script;
      return { data: { success: true } };
    }
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (project) project.script = script;
      return { data: { success: true } };
    }
    try {
      return await this.client.put(`/projects/${projectId}/script`, { script });
    } catch {
      this.mockMode = true;
      const project = mockProjects[projectId];
      if (project) project.script = script;
      return { data: { success: true } };
    }
  }

  async saveTrailerData(projectId: string, trailerData: TrailerDataPayload) {
    const { status } = await fetchApi(`/api/projects/${projectId}/trailer`, {
      method: "PUT",
      body: JSON.stringify(trailerData),
    });
    if (status === 200) return { data: { success: true } };
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (project) project.trailer_data = trailerData;
      return { data: { success: true } };
    }
    return { data: { success: false } };
  }

  async regenerateVideo(projectId: string) {
    if (this.mockMode) {
      const project = mockProjects[projectId];
      if (!project) return Promise.reject(new Error("Project not found"));
      project.status = "processing";
      project.created_at = new Date().toISOString();
      delete project.trailer_data;
      return { data: { success: true } };
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
      return { data: { success: true } };
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
    const { status } = await fetchApi(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    if (status === 200) {
      delete mockProjects[projectId];
      return { data: { success: true } };
    }
    if (status === 501 && this.mockMode) {
      delete mockProjects[projectId];
      return { data: { success: true } };
    }
    try {
      await this.client.delete(`/projects/${projectId}`);
      delete mockProjects[projectId];
      return { data: { success: true } };
    } catch {
      this.mockMode = true;
      delete mockProjects[projectId];
      return { data: { success: true } };
    }
  }
}

export const apiClient = new APIClient();
