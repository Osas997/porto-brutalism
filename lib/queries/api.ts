export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    const errMsg = json?.error?.message ?? `Request failed (${res.status})`;
    throw new ApiError(errMsg, res.status, json?.error?.details);
  }

  return json.data as T;
}

export async function uploadFile(
  file: File,
  folder = "projects"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/uploads/image", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    const errMsg = json?.error?.message ?? "Upload failed";
    throw new ApiError(errMsg, res.status);
  }

  return json.data.url as string;
}
