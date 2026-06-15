import { ZodError } from "zod"

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return Response.json({ data }, init)
}

export function jsonCreated<T>(data: T) {
  return jsonOk(data, { status: 201 })
}

export function jsonError(message: string, status = 500, details?: unknown) {
  return Response.json({ error: { message, details } }, { status })
}

export function validationError(error: ZodError) {
  return jsonError("Validation failed", 422, error.flatten())
}

export async function readJson(request: Request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}
