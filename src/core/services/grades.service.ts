import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getMyGrades(token: string): Promise<any> { return apiGet<any>('/grades/my', token); }
export function getGrades(token: string): Promise<any> { return apiGet<any>('/grades', token); }
export function getCourseGrades(token: string, courseId: string): Promise<any> { return apiGet<any>(`/courses/${courseId}/grades`, token); }
export function getCourseActivities(token: string, courseId: string): Promise<any> { return apiGet<any>(`/grades/course/${courseId}/activities`, token); }
export function updateGrade(token: string, gradeId: string, body: any): Promise<any> { return apiPatch<any>(`/grades/${gradeId}`, token, body); }
export function createGrade(token: string, body: any): Promise<any> { return apiPost<any>(`/grades`, token, body); }
