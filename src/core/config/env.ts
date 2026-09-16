/**
 * env.ts — URL base de la API Kelly Academy.
 * ─────────────────────────────────────────────
 * Importar esta constante siempre que se necesite la URL del backend.
 * NUNCA hardcodear 'http://localhost:3000' en los componentes.
 */
export const API_BASE_URL: string =
  (typeof process !== 'undefined' && process.env && process.env.PUBLIC_API_URL) ||
  import.meta.env.PUBLIC_API_URL || 
  'https://backend-kellyacademy.onrender.com/api/v1';
