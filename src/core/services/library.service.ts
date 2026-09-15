import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';

/** Solo para profesor — lista todos sus recursos */
export function getLibraryResources(token: string, page = 1, limit = 20): Promise<any> {
  return apiGet<any>(`/library?page=${page}&limit=${limit}`, token);
}

/** Para estudiantes — solo recursos publicados (isPublished = true) */
export function getPublicLibraryResources(token: string, page = 1, limit = 50): Promise<any> {
  return apiGet<any>(`/library/public?page=${page}&limit=${limit}`, token);
}

export function createResource(token: string, body: any) { return apiPost('/library', token, body); }
export function updateResource(token: string, id: string, body: any) { return apiPatch(`/library/${id}`, token, body); }
export function deleteResource(token: string, id: string) { return apiDelete(`/library/${id}`, token); }

/** Publicar o despublicar un recurso — usa el endpoint dedicado con el campo correcto */
export function setResourcePublished(token: string, id: string, isPublished: boolean): Promise<any> {
  return apiPatch<any>(`/library/${id}/publish`, token, { isPublished });
}
