import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getCourseAnnouncements(token: string, courseId: string) {
  return apiGet(`/courses/${courseId}/announcements`, token);
}

export function createAnnouncement(token: string, body: any) { return apiPost('/announcements', token, body); }
export function updateAnnouncement(token: string, id: string, body: any) { return apiPatch(`/announcements/${id}`, token, body); }
export function deleteAnnouncement(token: string, id: string) { return apiDelete(`/announcements/${id}`, token); }
