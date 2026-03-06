import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Simulate a tiny delay to mimic network latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Construct the structured payload matching DevTrailer specifications
    const mockData = {
      success: true,
      data: {
        projectName: body?.projectName || "DevTrailer Demo",
        script:
          "Developers build great products, but marketing them is hard. DevTrailer automates the entire process of making a production-ready trailer for a software project.",
        theme: {
          primary: "#10b981",
          background: "#0a0a0a",
        },
        assets: [
          "https://picsum.photos/seed/devtrailer1/1920/1080",
          "https://picsum.photos/seed/devtrailer2/1920/1080",
        ],
      },
    };

    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Generation failed" },
      { status: 500 }
    );
  }
};
