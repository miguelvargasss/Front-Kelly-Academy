import { apiGet } from '../apiClient';
import type { Level } from '../types/api.types';

/**
 * GET /levels
 * Obtiene la lista de niveles configurados en la base de datos.
 */
export function getLevels(token: string): Promise<Level[]> {
  return apiGet<Level[]>('/levels', token);
}
