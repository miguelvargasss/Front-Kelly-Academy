import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getUsers(token: string, role?: string, status?: string, page = 1, limit = 20) {
  let query = `/users?page=${page}&limit=${limit}`;
  if (role) query += `&role=${role}`;
  if (status) query += `&status=${status}`;
  return apiGet(query, token);
}
export function getUserById(token: string, userId: string) { return apiGet(`/users/${userId}`, token); }
export function updateUser(token: string, userId: string, body: any) { return apiPatch(`/users/${userId}`, token, body); }
export function deleteUser(token: string, userId: string) { return apiDelete(`/users/${userId}`, token); }
export function getUserCourses(token: string, userId: string) { return apiGet(`/users/${userId}/courses`, token); }

export function createUser(token: string, body: any) { return apiPost('/users', token, body); }
export function updateUserStatus(token: string, userId: string, body: any) { return apiPatch(`/users/${userId}/status`, token, body); }
export function assignCourse(token: string, userId: string, courseId: string) { return apiPost(`/users/${userId}/courses`, token, { courseId }); }
export function removeCourse(token: string, userId: string, courseId: string) { return apiDelete(`/users/${userId}/courses/${courseId}`, token); }
