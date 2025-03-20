// API service for VibeCode application

// Base URL for API requests
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://composer-backend.onrender.com";

export interface GenerateResponse {
  publicUrl: string;
  timestamp: string;
  projectId: string;
}

/**
 * Generate a new app based on user message
 */
export async function generateApp(message: string): Promise<GenerateResponse> {
  const response = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Resume an existing project
 */
export async function resumeProject(projectId: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/api/projects/${projectId}/resume`, {
    method: "POST",
    body: JSON.stringify({
      projectId: projectId,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}