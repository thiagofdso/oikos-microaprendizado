import type { ThemeColorName, ThemePaletteName } from "@/lib/theme";

export type SessionStatus = "scheduled" | "live" | "completed";
export type LessonFormat = "video" | "audio" | "reading" | "live";
export type ExerciseType = "objective" | "discursive";
export type NotificationCategory = "reminder" | "ranking" | "community" | "system";
export type ForumTopicTag = "discipleship" | "leadership" | "prayer" | "youth";
export type PlanTier = "starter" | "growth" | "impact";
export type ChurchStatus = "onboarding" | "active";

export interface Session {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: SessionStatus;
  startsAt: string;
  durationMinutes: number;
  hostName: string;
  attendeeCount: number;
  lessonIds: string[];
  primaryGoal: string;
}

export interface Lesson {
  id: string;
  sessionId: string;
  slug: string;
  title: string;
  summary: string;
  format: LessonFormat;
  durationMinutes: number;
  releaseDate: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  tags: string[];
  exerciseIds: string[];
}

export interface ExerciseOption {
  id: string;
  label: string;
  text: string;
}

export interface ExerciseBase {
  id: string;
  lessonId: string;
  type: ExerciseType;
  title: string;
  prompt: string;
  points: number;
}

export interface ObjectiveExercise extends ExerciseBase {
  type: "objective";
  options: ExerciseOption[];
  correctOptionId: string;
  explanation: string;
}

export interface DiscursiveExercise extends ExerciseBase {
  type: "discursive";
  suggestedTopics: string[];
  rubric: string[];
  exemplarAnswer: string;
  minWords: number;
}

export type Exercise = ObjectiveExercise | DiscursiveExercise;

export interface Student {
  id: string;
  name: string;
  churchId: string;
  rank: number;
  xp: number;
  streakDays: number;
  completionRate: number;
  avatarTone: ThemePaletteName;
}

export interface Notification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  audience: "all" | "leaders" | "students";
}

export interface ForumTopic {
  id: string;
  churchId: string;
  authorId: string;
  title: string;
  excerpt: string;
  tag: ForumTopicTag;
  repliesCount: number;
  participantsCount: number;
  lastActivityAt: string;
  isPinned: boolean;
}

export interface Plan {
  id: string;
  tier: PlanTier;
  name: string;
  seatLimit: number;
  monthlyPriceBrl: number;
  features: string[];
  highlightColor: ThemeColorName;
  recommended: boolean;
}

export interface PastorUser {
  id: string;
  churchId: string;
  planId: string;
  name: string;
  email: string;
  phone: string;
  role: "lead-pastor" | "campus-pastor";
  initials: string;
}

export interface Church {
  id: string;
  name: string;
  city: string;
  state: string;
  status: ChurchStatus;
  memberCount: number;
  activeStudents: number;
  campusCount: number;
  planId: string;
  pastorId: string;
}

export interface ExerciseFeedback {
  id: string;
  exerciseId: string;
  studentId: string;
  submittedAt: string;
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}
