import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getSubmissions(token: string): Promise<any> { return apiGet<any>('/submissions', token); }
export function getMySubmissions(token: string): Promise<any> { return apiGet<any>('/submissions/my', token); }
export function getItemSubmissions(token: string, itemId: string): Promise<any> { return apiGet<any>(`/submissions/item/${itemId}`, token); }
export function getItemSubmissionsWithStudents(token: string, itemId: string, courseId: string): Promise<any> { return apiGet<any>(`/submissions/item/${itemId}/students?courseId=${courseId}`, token); }
export function createSubmission(token: string, body: any): Promise<any> { return apiPost<any>(`/submissions`, token, body); }
export function updateSubmission(token: string, submissionId: string, body: any): Promise<any> { return apiPatch<any>(`/submissions/${submissionId}`, token, body); }
