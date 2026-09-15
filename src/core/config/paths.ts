/**
 * paths.ts — Mapa centralizado de rutas y activos estáticos
 * ============================================================
 * REGLA ARQUITECTÓNICA: Todas las rutas de navegación e imágenes
 * del proyecto deben definirse aquí. NUNCA hardcodear strings de
 * rutas directamente en componentes o páginas.
 *
 * Razón: Evita errores 404 dispersos, facilita refactorizaciones
 * y mantiene un contrato único y tipado para todo el proyecto.
 */

// ─── Rutas de navegación ──────────────────────────────────────
export const APP_ROUTES = {
  login:           '/login',
  home:            '/',
  courses:         '/estudiante/cursos',
  coursesMine:     '/estudiante/cursos/mis-cursos',
  courseDetail:    (courseId: string) => `/estudiante/cursos/${courseId}`,
  courseStudents:  (courseId: string) => `/estudiante/cursos/${courseId}/alumnos`,
  courseMaterial:  (courseId: string) => `/estudiante/cursos/${courseId}/material`,
  courseGrades:    (courseId: string) => `/estudiante/cursos/${courseId}/calificaciones`,
  courseCalendar:  (courseId: string) => `/estudiante/cursos/${courseId}/calendario`,
  courseAnnouncements: (courseId: string) => `/estudiante/cursos/${courseId}/anuncios`,
  courseResource:      (courseId: string, resourceId: string) => `/estudiante/cursos/${courseId}/recurso/${resourceId}`,
  newCourse:       '/estudiante/cursos/nuevo',
  newClass:        '/estudiante/cursos/nueva-clase',

  grades:          '/estudiante/calificaciones',
  library:         '/estudiante/biblioteca',
  pagos:           '/estudiante/pagos',
  settings:        '/configuracion',
} as const;

// ─── Rutas de Profesor ────────────────────────────────────────
export const TEACHER_ROUTES = {
  home:                  '/profesor',
  courses:               '/profesor/cursos',
  courseDetail:          (courseId: string) => `/profesor/cursos/${courseId}`,
  courseStudents:        (courseId: string) => `/profesor/cursos/${courseId}/alumnos`,
  courseCalendar:        (courseId: string) => `/profesor/cursos/${courseId}/calendario`,
  courseAnnouncements:   (courseId: string) => `/profesor/cursos/${courseId}/anuncios`,
  courseGradebook:       (courseId: string) => `/profesor/cursos/${courseId}/calificaciones`,
  courseResource:        (courseId: string, resourceId: string) => `/profesor/cursos/${courseId}/recurso/${resourceId}`,
  library:               '/profesor/biblioteca',
  alumnos:               '/profesor/alumnos',
  newClass:              '/profesor/nueva-clase',
  settings:              '/configuracion',
} as const;

// ─── Activos de branding ──────────────────────────────────────
export const BRAND_ASSETS = {
  logoBase:      '/branding/logo-base.png',
  logoDiagonal:  '/branding/logo-diagonal.png',
  logoWatermark: '/branding/logo-watermark.png',
} as const;

// ─── Activos de avatares ──────────────────────────────────────
// Agregar aquí la ruta cuando se cuente con el archivo real en src/assets/images/avatars/
// Ejemplo: kelly: '/avatars/kelly.jpg'
export const AVATAR_ASSETS = {
  default: '/avatars/default.png',
} as const;

// ─── Activos de login / auth ──────────────────────────────────
export const AUTH_ASSETS = {
  loginHero: '/image/image-login.jpeg',
} as const;
