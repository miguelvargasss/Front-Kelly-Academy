import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
import type {
  Course, CourseEnrollment, CourseListResponse, CourseStats,
  ContentWeek, ContentItem, CreateCourseBody, UpdateCourseBody,
  ClassListResponse, CreateWeekBody, CreateWeekItemBody, UpdateWeekItemBody, UpdateWeekItemVisibilityBody,
} from '../types/api.types';

export function getCourses(token: string, page = 1, limit = 20): Promise<CourseListResponse> {
  return apiGet<CourseListResponse>(`/courses?page=${page}&limit=${limit}`, token);
}
export function getMyCourses(token: string): Promise<CourseEnrollment[]> {
  return apiGet<CourseEnrollment[]>('/courses/my', token);
}
export function getClasses(token: string, page = 1, limit = 20): Promise<ClassListResponse> {
  return apiGet<ClassListResponse>(`/classes?page=${page}&limit=${limit}`, token);
}
export function createCourse(token: string, body: CreateCourseBody): Promise<Course> {
  return apiPost<Course>('/courses', token, body);
}
export function getCourseById(token: string, courseId: string): Promise<Course> {
  return apiGet<Course>(`/courses/${courseId}`, token);
}
export function updateCourse(token: string, courseId: string, body: UpdateCourseBody): Promise<Course> {
  return apiPatch<Course>(`/courses/${courseId}`, token, body);
}
export function deleteCourse(token: string, courseId: string): Promise<void> {
  return apiDelete<void>(`/courses/${courseId}`, token);
}
export function getCourseStudents(token: string, courseId: string): Promise<CourseEnrollment[]> {
  return apiGet<CourseEnrollment[]>(`/courses/${courseId}/students`, token);
}
export function getCourseStats(token: string, courseId: string): Promise<CourseStats> {
  return apiGet<CourseStats>(`/courses/${courseId}/stats`, token);
}
export function getCourseWeeks(token: string, courseId: string): Promise<ContentWeek[]> {
  return apiGet<ContentWeek[]>(`/courses/${courseId}/weeks`, token);
}
export function getWeekItems(token: string, courseId: string, weekId: string): Promise<ContentItem[]> {
  return apiGet<ContentItem[]>(`/courses/${courseId}/weeks/${weekId}/items`, token);
}
export function getCourseWeeksFull(token: string, courseId: string): Promise<(ContentWeek & { items: ContentItem[] })[]> {
  return apiGet<(ContentWeek & { items: ContentItem[] })[]>(`/courses/${courseId}/weeks/full`, token);
}
export function createCourseWeek(token: string, courseId: string, body: CreateWeekBody): Promise<ContentWeek> {
  return apiPost<ContentWeek>(`/courses/${courseId}/weeks`, token, body);
}
export function createWeekItem(token: string, courseId: string, weekId: string, body: CreateWeekItemBody): Promise<ContentItem> {
  return apiPost<ContentItem>(`/courses/${courseId}/weeks/${weekId}/items`, token, body);
}
export function updateWeekItem(token: string, courseId: string, weekId: string, itemId: string, body: UpdateWeekItemBody): Promise<ContentItem> {
  return apiPatch<ContentItem>(`/courses/${courseId}/weeks/${weekId}/items/${itemId}`, token, body);
}
export function deleteWeekItem(token: string, courseId: string, weekId: string, itemId: string): Promise<void> {
  return apiDelete<void>(`/courses/${courseId}/weeks/${weekId}/items/${itemId}`, token);
}
export function updateWeekItemVisibility(token: string, courseId: string, weekId: string, itemId: string, body: UpdateWeekItemVisibilityBody): Promise<ContentItem> {
  return apiPatch<ContentItem>(`/courses/${courseId}/weeks/${weekId}/items/${itemId}/visibility`, token, body);
}
