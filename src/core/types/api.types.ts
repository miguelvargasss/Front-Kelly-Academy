/**
 * api.types.ts — Contratos TypeScript de la API Kelly Academy.
 * ──────────────────────────────────────────────────────────────
 * Espeja exactamente los shapes de respuesta del backend NestJS.
 *
 * IMPORTANTE: Todas las respuestas del backend están envueltas en:
 *   { success: boolean, statusCode: number, data: T }
 * El apiClient desenvuelve esto automáticamente antes de entregar T.
 *
 * Regla: sin `any`, sin tipos implícitos.
 */

// ─── Envelope del ResponseTransformInterceptor ─────────────────
export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ─── Auth ───────────────────────────────────────────────────────
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  role: 'profesor' | 'estudiante';
}

export interface RefreshResponse {
  accessToken: string;
}

/** Body para POST /auth/login */
export interface LoginBody {
  email: string;
  password: string;
  requestedRole?: 'profesor' | 'estudiante';
}

/** Body para POST /auth/refresh */
export interface RefreshBody {
  refreshToken: string;
}

// ─── User / Perfil ──────────────────────────────────────────────
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: 'profesor' | 'estudiante';
  status: 'activo' | 'inactivo' | 'suspendido' | 'en_riesgo';
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  users: UserProfile[];
  meta: PaginationMeta;
}

/** Body para POST /users */
export interface CreateUserBody {
  fullName: string;
  email: string;
  password: string;
  role: 'profesor' | 'estudiante';
  phone?: string;
}

/** Body para PATCH /users/:id */
export interface UpdateUserBody {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

/** Body para PATCH /users/:id/status */
export interface UpdateUserStatusBody {
  status: 'activo' | 'inactivo' | 'suspendido' | 'en_riesgo';
}

/** Body para POST /users/:id/courses */
export interface AssignCourseBody {
  courseId: string;
}

// ─── Levels ─────────────────────────────────────────────────────
export interface Level {
  id: string;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Courses ────────────────────────────────────────────────────
export interface Course {
  id: string;
  teacherId: string;
  teacher: Omit<UserProfile, 'passwordHash'>;
  title: string;
  subtitle: string | null;
  code: string;
  groupNumber: string | null;
  modality: 'remoto' | 'presencial' | 'hibrido';
  level: string | null;
  status: 'abierto' | 'cerrado' | 'archivado';
  bannerGradient: string | null;
  period: string | null;
  maxStudents: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  student: UserProfile;
  course: Course;
  enrolledAt: string;
  status: 'activo' | 'retirado' | 'completado';
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseListResponse {
  courses: Course[];
  meta: PaginationMeta;
}

export interface CourseStats {
  studentCount: number;
  activeStudents: number;
  averageProgress: number;
}

/** Body para POST /courses */
export interface CreateCourseBody {
  title: string;
  subtitle?: string;
  code: string;
  groupNumber?: string;
  modality: 'remoto' | 'presencial' | 'hibrido';
  level?: string;
  period?: string;
  maxStudents?: number;
  bannerGradient?: string;
}

/** Body para PATCH /courses/:id */
export type UpdateCourseBody = Partial<CreateCourseBody> & {
  status?: 'abierto' | 'cerrado' | 'archivado';
};

// ─── Classes (Sesiones sincrónicas) ─────────────────────────────
export interface ClassSession {
  id: string;
  courseId: string;
  course?: Course;
  teacherId: string;
  title: string;
  description: string | null;
  scheduledAt: string;   // ISO 8601
  durationMinutes: number;
  meetUrl: string | null;
  status: 'programada' | 'en_curso' | 'finalizada' | 'cancelada';
  createdAt: string;
  updatedAt: string;
}

export interface ClassListResponse {
  classes: ClassSession[];
  meta: PaginationMeta;
}

// ─── Announcements ───────────────────────────────────────────────
export interface Announcement {
  id: string;
  courseId: string;
  authorId: string;
  author?: UserProfile;
  title: string;
  /** Matches backend entity field `content` (plain text or HTML) */
  content: string;
  isPinned: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Body para POST /courses/:courseId/announcements */
export interface CreateAnnouncementBody {
  title: string;
  /** Matches backend DTO field `content` */
  content: string;
  isPinned?: boolean;
  isPublished?: boolean;
}

/** Body para PATCH /courses/:courseId/announcements/:annId */
export type UpdateAnnouncementBody = Partial<CreateAnnouncementBody>;

// ─── Content (Semanas e Ítems) ───────────────────────────────────
export interface ContentWeek {
  id: string;
  courseId: string;
  weekNumber: number;
  title: string;
  description: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContentItemType =
  | 'video'
  | 'pdf'
  | 'quiz'
  | 'assignment'
  | 'link'
  | 'audio'
  | 'text';

export interface ContentItem {
  id: string;
  weekId: string;
  title: string;
  type: string;
  kind: string;
  url: string | null;
  meta: string | null;
  description?: string | null; // Keep for backwards compatibility with UI events if any
  isPublished: boolean;
  isVisible: boolean;
  dueDate: string | null;
  maxScore: number | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Body para POST /courses/:courseId/weeks */
export interface CreateWeekBody {
  weekNumber: number;
  title: string;
  description?: string;
}

/** Body para POST /courses/:courseId/weeks/:weekId/items */
export interface CreateWeekItemBody {
  title: string;
  type: string;
  url?: string;
  meta?: string;
  isVisible?: boolean;
  order?: number;
  dueDate?: string;
  maxScore?: number;
}

/** Body para PATCH /courses/:courseId/weeks/:weekId/items/:itemId */
export type UpdateWeekItemBody = Partial<CreateWeekItemBody>;

/** Body para PATCH /courses/:courseId/weeks/:weekId/items/:itemId/visibility */
export interface UpdateWeekItemVisibilityBody {
  isVisible: boolean;
}

// ─── Submissions ─────────────────────────────────────────────────
export interface Submission {
  id: string;
  itemId: string;
  studentId: string;
  student?: UserProfile;
  item?: ContentItem;
  fileUrl: string | null;
  textContent: string | null;
  status: 'enviado' | 'revisado' | 'calificado';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Body para POST /submissions */
export interface CreateSubmissionBody {
  itemId: string;
  fileUrl?: string;
  textContent?: string;
}

// ─── Grades ──────────────────────────────────────────────────────
export interface Grade {
  id: string;
  submissionId: string;
  submission?: Submission;
  gradedById: string;
  gradedBy?: UserProfile;
  score: number;
  maxScore: number;
  feedback: string | null;
  gradedAt: string;
  createdAt: string;
}

export interface GradeListResponse {
  grades: Grade[];
  meta: PaginationMeta;
}

/** Body para POST /grades */
export interface CreateGradeBody {
  submissionId: string;
  score: number;
  feedback?: string;
}

/** Body para PATCH /grades/:id */
export type UpdateGradeBody = Partial<CreateGradeBody>;

// ─── Payments ────────────────────────────────────────────────────
export interface Payment {
  id: string;
  studentId: string;
  student?: UserProfile;
  courseId: string;
  course?: Course;
  amount: number;
  currency: string;
  status: 'pendiente' | 'pagado' | 'vencido' | 'cancelado';
  dueDate: string;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
}

export interface PaymentListResponse {
  payments: Payment[];
  meta: PaginationMeta;
}

export interface PaymentSummary {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}

/** Body para POST /payments */
export interface CreatePaymentBody {
  studentId: string;
  courseId: string;
  amount: number;
  currency?: string;
  dueDate: string;
  notes?: string;
}

/** Body para PATCH /payments/:id */
export interface UpdatePaymentBody {
  status?: 'pendiente' | 'pagado' | 'vencido' | 'cancelado';
  paidAt?: string;
  notes?: string;
}

// ─── Library ─────────────────────────────────────────────────────
export interface LibraryResource {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  /** Tipo de recurso: documento, video, presentacion, audio, enlace, imagen */
  type: string;
  /** Etiqueta de curso (tag) opcional */
  courseTag: string | null;
  fileUrl: string | null;
  fileSizeBytes: number | null;
  mimeType: string | null;
  /** true = visible para estudiantes en /library/public */
  isPublished: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryListResponse {
  resources: LibraryResource[];
  meta: PaginationMeta;
}

/** Body para POST /library */
export interface CreateLibraryResourceBody {
  title: string;
  type: string;
  fileUrl?: string;
  mimeType?: string;
  description?: string;
  courseTag?: string;
  fileSizeBytes?: number;
  isPublished?: boolean;
}

/** Body para PATCH /library/:id */
export type UpdateLibraryResourceBody = Partial<CreateLibraryResourceBody>;

/** Body para PATCH /library/:id/publish */
export interface PublishLibraryResourceBody {
  isPublished: boolean;
}

// ─── Calendar ──────────────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  courseId: string | null;
  course?: Course;
  creatorId: string;
  title: string;
  description: string | null;
  eventType: 'clase' | 'tarea' | 'quiz' | 'evaluacion' | 'pago' | 'anuncio' | 'general';
  startsAt: string;   // ISO 8601 — matches backend entity `starts_at`
  endsAt: string | null;   // ISO 8601 — matches backend entity `ends_at`
  allDay: boolean;
  color: string | null;
  relatedItemId: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Body para POST /calendar */
export interface CreateCalendarEventBody {
  courseId?: string;
  title: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  eventType: 'clase' | 'tarea' | 'quiz' | 'evaluacion' | 'pago' | 'anuncio' | 'general';
  allDay?: boolean;
  color?: string;
}

/** Body para PATCH /calendar/:id */
export type UpdateCalendarEventBody = Partial<CreateCalendarEventBody>;
