/**
 * api.ts — Barrel de compatibilidad. NO agregar lógica nueva aquí.
 * ─────────────────────────────────────────────────────────────────
 * Este archivo mantiene compatibilidad con imports existentes mientras
 * la base de código migra progresivamente a los servicios por dominio.
 *
 * ✅ NUEVA ARQUITECTURA (usar esto):
 *   import { authLogin }           from '@/core/services/auth.service';
 *   import { getCourses }          from '@/core/services/courses.service';
 *   import { getGrades }           from '@/core/services/grades.service';
 *   import { getUsers }            from '@/core/services/users.service';
 *   import { getPayments }         from '@/core/services/payments.service';
 *   import { getLibraryResources } from '@/core/services/library.service';
 *   import { getCalendarEvents }   from '@/core/services/calendar.service';
 *   import { getCourseAnnouncements } from '@/core/services/announcements.service';
 *   import { createSubmission }    from '@/core/services/submissions.service';
 *
 * ⚠️  DEPRECATED (solo para código legacy, no importar en archivos nuevos):
 *   Las funciones de este barrel seguirán funcionando pero serán eliminadas
 *   en una futura refactorización.
 */

// Re-exporta el error tipado y el cliente HTTP base
export { ApiError, apiRequest, apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';

// Re-exporta todos los servicios por dominio
export * from './levels.service';
export * from './auth.service';
export * from './courses.service';
export * from './grades.service';
export * from './users.service';
export * from './payments.service';
export * from './library.service';
export * from './calendar.service';
export * from './announcements.service';
export * from './submissions.service';
export * from './upload.service';
