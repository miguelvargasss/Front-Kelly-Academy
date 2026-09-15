/**
 * env.ts — URL base de la API Kelly Academy.
 * ─────────────────────────────────────────────
 * Importar esta constante siempre que se necesite la URL del backend.
 * NUNCA hardcodear 'http://localhost:3000' en los componentes.
 */
export const API_BASE_URL: string =
  import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
