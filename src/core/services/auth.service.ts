import { apiGet, apiPost } from '../apiClient';
import type { LoginBody, AuthResponse } from '../types/api.types';

export function authLogin(body: LoginBody): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login', '', body);
}

export function authRefresh(token: string): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/refresh', token, {});
}

export function authLogout(token: string): Promise<void> {
  return apiPost<void>('/auth/logout', token, {});
}

export function authMe(token: string): Promise<any> {
  return apiGet<any>('/auth/me', token);
}

/**
 * GET /permissions/routes/role?role=:role
 * Devuelve las rutas permitidas para un rol específico.
 */
export function getRoleRoutes(token: string, role: string): Promise<any[]> {
  return apiGet<any[]>(`/permissions/routes/role?role=${role}`, token);
}
