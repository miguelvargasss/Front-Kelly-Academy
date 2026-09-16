/**
 * apiClient.ts — Motor HTTP centralizado de Kelly Academy.
 * ──────────────────────────────────────────────────────────
 * Responsabilidades ÚNICAS de este módulo:
 *   1. Adjuntar el Bearer token a cada petición.
 *   2. Deserializar el envelope { success, statusCode, data } del backend.
 *   3. Lanzar ApiError tipado con el mensaje NestJS.
 *
 * NO contiene lógica de dominio. Cada módulo tiene su propio service file:
 *   src/core/services/auth.service.ts
 *   src/core/services/courses.service.ts
 *   ... etc.
 *
 * Uso en frontmatter SSR (Astro):
 *   import { apiGet } from '../core/apiClient';
 *   const token = Astro.cookies.get('ka_session')?.value ?? '';
 *   const courses = await apiGet<CourseListResponse>('/courses', token);
 */

import { API_BASE_URL } from './config/env';
import type { ApiEnvelope } from './types/api.types';

// ─── Error tipado de la API ─────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── Tipo de método HTTP ────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// ─── Función base ───────────────────────────────────────────────

/**
 * Realiza una petición HTTP al backend NestJS.
 * - Incluye Authorization header si se proporciona token.
 * - Desenvuelve el ApiEnvelope<T> automáticamente.
 * - Lanza ApiError con el mensaje del backend en caso de error.
 */
export async function apiRequest<T>(
  method: HttpMethod,
  path: string,
  token: string,
  body?: unknown,
): Promise<T> {
  const isFormData = body instanceof FormData;
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${path}`;
  console.log(`[API Client] Executing ${method} ${url} (SSR/Client)`);

  const response = await fetch(url, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
  });

  // NestJS siempre devuelve JSON (incluso en errores via HttpExceptionFilter)
  const json = (await response.json()) as
    | ApiEnvelope<T>
    | { message: string; statusCode: number };

  if (!response.ok) {
    const errBody = json as { message: string | string[]; statusCode: number };
    const rawMessage = errBody.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(', ')
      : rawMessage ?? `Error ${response.status}`;
    throw new ApiError(response.status, message);
  }

  // Desenvuelve { success, statusCode, data } → devuelve solo data
  return (json as ApiEnvelope<T>).data;
}

// ─── Shortcuts de método ────────────────────────────────────────

/** GET /api/v1{path} con Bearer token */
export const apiGet = <T>(path: string, token: string): Promise<T> =>
  apiRequest<T>('GET', path, token);

/** POST /api/v1{path} con Bearer token y body */
export const apiPost = <T>(path: string, token: string, body: unknown): Promise<T> =>
  apiRequest<T>('POST', path, token, body);

/** PATCH /api/v1{path} con Bearer token y body parcial */
export const apiPatch = <T>(path: string, token: string, body: unknown): Promise<T> =>
  apiRequest<T>('PATCH', path, token, body);

/** PUT /api/v1{path} con Bearer token y body */
export const apiPut = <T>(path: string, token: string, body: unknown): Promise<T> =>
  apiRequest<T>('PUT', path, token, body);

/** DELETE /api/v1{path} con Bearer token */
export const apiDelete = <T>(path: string, token: string): Promise<T> =>
  apiRequest<T>('DELETE', path, token);
