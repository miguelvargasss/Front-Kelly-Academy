import { apiPost } from '../apiClient';


/**
 * Sube un archivo a Cloudinary a través del backend.
 * @param file Objeto File del input.
 * @param context 'library' o 'submission' para aplicar los límites de tamaño correctos.
 * @param token Token JWT del usuario activo.
 */
export async function uploadFile(
  file: File,
  context: 'library' | 'submission',
  token: string
): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiPost<UploadResponse>(`/upload/${context}`, token, formData);
}
