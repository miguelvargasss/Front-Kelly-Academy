import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getCourseEvents(token: string, courseId: string) {
  return apiGet(`/calendar/course/${courseId}`, token);
}

export function createEvent(token: string, body: any) { return apiPost('/calendar', token, body); }
export function updateEvent(token: string, id: string, body: any) { return apiPatch(`/calendar/${id}`, token, body); }
export function deleteEvent(token: string, id: string) { return apiDelete(`/calendar/${id}`, token); }
