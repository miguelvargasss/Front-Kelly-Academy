import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
export function getPayments(token: string): Promise<any> { return apiGet<any>('/payments', token); }
export function getMyPayments(token: string): Promise<any> { return apiGet<any>('/payments/my', token); }
export function getPaymentSummary(token: string): Promise<any> { return apiGet<any>('/payments/summary', token); }
export function createPayment(token: string, body: any): Promise<any> { return apiPost<any>(`/payments`, token, body); }
export function updatePayment(token: string, paymentId: string, body: any): Promise<any> { return apiPatch<any>(`/payments/${paymentId}`, token, body); }
