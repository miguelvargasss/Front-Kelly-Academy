/**
 * middleware.ts — Autenticación y control de acceso por rol
 * ─────────────────────────────────────────────────────────────────
 * Ejecuta server-side ANTES de renderizar cualquier página.
 * Lee cookies `ka_session` y `ka_role` para:
 *   1. Redirigir usuarios no autenticados al login (sin flash).
 *   2. Redirigir usuarios autenticados fuera del login.
 *   3. Aislar rutas de profesor y estudiante por rol.
 *
 * Estructura de rutas:
 *   /            → dispatcher (redirige según rol)
 *   /login       → pública
 *   /estudiante  → solo rol=estudiante
 *   /profesor    → solo rol=profesor
 *   /cursos/*    → solo rol=estudiante
 *   /calificaciones, /biblioteca, /pagos → solo rol=estudiante
 *   /configuracion → compartida
 */
import { defineMiddleware } from 'astro:middleware';

/** Rutas accesibles sin sesión */
const PUBLIC_PATHS = ['/login'];

/** Rutas compartidas entre ambos roles */
const SHARED_PREFIXES = ['/configuracion'];

/** Prefijo del portal docente */
const TEACHER_PREFIX = '/profesor';

/** Prefijos del portal estudiantil */
const STUDENT_PREFIXES = ['/estudiante', '/cursos', '/calificaciones', '/biblioteca', '/pagos'];

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  // Dejar pasar assets estáticos y rutas internas de Astro/Vite
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/@') ||
    pathname.startsWith('/node_modules') ||
    pathname.includes('.')
  ) {
    return next();
  }

  const session = cookies.get('ka_session')?.value;
  const role    = cookies.get('ka_role')?.value ?? 'estudiante';

  // ── Rutas públicas ──────────────────────────────────────────
  if (PUBLIC_PATHS.includes(pathname)) {
    // Usuario ya autenticado → redirigir a su portal
    if (session) {
      return redirect(role === 'profesor' ? '/profesor' : '/estudiante', 302);
    }
    return next();
  }

  // ── Raíz → dispatcher (el index.astro ya lo maneja, pero doble seguro) ──
  if (pathname === '/') {
    if (!session) return redirect('/login', 302);
    return redirect(role === 'profesor' ? '/profesor' : '/estudiante', 302);
  }

  // ── Todas las demás rutas requieren sesión ──────────────────
  if (!session) {
    return redirect('/login', 302);
  }

  // ── Rutas compartidas → permitir ambos roles ───────────────
  if (SHARED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return next();
  }

  // ── Aislamiento de roles ───────────────────────────────────
  const isTeacherRoute  = pathname.startsWith(TEACHER_PREFIX);
  const isStudentRoute  = STUDENT_PREFIXES.some((p) => pathname.startsWith(p));

  if (role === 'profesor') {
    if (isStudentRoute) {
      // Profesor intentando acceder al portal estudiantil → redirigir a su home
      return redirect('/profesor', 302);
    }
  } else {
    // Estudiante intentando acceder al portal docente → redirigir a su home
    if (isTeacherRoute) {
      return redirect('/estudiante', 302);
    }
  }

  return next();
});
