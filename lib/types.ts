export type UserRole = "client" | "expert" | "admin";

export type ConsultationMode = "immediate" | "scheduled" | "crowdsourcing";

export type Urgency = "immediate" | "within_24h" | "within_week" | "flexible";

export type Confidentiality = "standard" | "strict";

export type BudgetPreference = "low" | "medium" | "high";

export type Expert = {
  id: string;
  profileId: string;
  firstName: string;
  lastName: string;
  title: string;
  city: string;
  bio: string;
  domains: string[];
  certifications: string[];
  hourlyRate: number;
  flatRate?: number;
  languages: string[];
  yearsExperience: number;
  responseTime: string;
  nextAvailableSlot: string;
  validationStatus: "pending" | "validated" | "suspended" | "rejected";
  isAvailableImmediately: boolean;
  confidentialityPolicy: "standard" | "strict_ok";
  averageRating: number;
  totalReviews: number;
  totalConsultations: number;
  completionRate: number;
  responseRate: number;
  verifiedBadges: string[];
  trustSummary: string;
  avatarUrl?: string;
};

export type Mission = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  domain: string;
  mode: ConsultationMode;
  budgetAmount?: number;
  budgetPreference: BudgetPreference;
  preferredLanguage: string;
  urgency: Urgency;
  confidentiality: Confidentiality;
  complexityScore: number;
  status: "pending_ai" | "recommended" | "in_consultation" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
};

export type Recommendation = {
  expert: Expert;
  compatibilityScore: number;
  semanticScore: number;
  ruleScore: number;
  matchReasons: string[];
  alerts: string[];
  rank: number;
};

export type CrowdsourcingLot = {
  id: string;
  missionId: string;
  number: number;
  title: string;
  description: string;
  domain: string;
  budget: number;
  deadline: string;
  status: "created" | "assigned" | "accepted" | "in_progress" | "delivered" | "validated" | "late";
  expertId?: string;
};

export type DemoUser = {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  preferredLanguage: string;
  avatarInitials: string;
  avatarUrl?: string;
  expertId?: string;
};

export type Consultation = {
  id: string;
  missionId: string;
  clientId: string;
  expertId: string;
  modality: "chat" | "video" | "audio";
  status: "pending" | "accepted" | "scheduled" | "in_session" | "completed" | "cancelled";
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  durationMinutes: number;
  estimatedAmount: number;
  messages: {
    id: string;
    sender: "client" | "expert";
    body: string;
    at: string;
  }[];
};

export type Payment = {
  id: string;
  consultationId?: string;
  lotId?: string;
  clientId: string;
  expertId: string;
  amount: number;
  commission: number;
  payout: number;
  status: "pending" | "paid" | "refunded" | "disputed";
  createdAt: string;
};

export type Review = {
  id: string;
  consultationId: string;
  clientId: string;
  expertId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  type: "consultation" | "payment" | "crowdsourcing" | "system";
  title: string;
  body: string;
  actionUrl: string;
  read: boolean;
  createdAt: string;
};

export type SuccessStory = {
  id: string;
  clientName: string;
  clientRole: string;
  expertId: string;
  title: string;
  summary: string;
  outcome: string;
  domain: string;
};

export type NetworkPost = {
  id: string;
  authorName: string;
  authorRole: string;
  avatarUrl?: string;
  initials: string;
  type: "insight" | "question" | "success" | "availability";
  title: string;
  body: string;
  domain: string;
  createdAt: string;
  replies: number;
};

export type ExpertCollection = {
  id: string;
  title: string;
  description: string;
  domain: string;
  expertIds: string[];
};

export type ExpertValidationCase = {
  id: string;
  expertId: string;
  submittedAt: string;
  priority: "normal" | "high" | "critical";
  currentStep: "profile_review" | "documents_review" | "interview" | "decision";
  aiRiskScore: number;
  aiRecommendation: "approve_with_checks" | "manual_review" | "reject";
  requiredChecks: {
    id: string;
    label: string;
    description: string;
  }[];
  documents: {
    id: string;
    label: string;
    status: "verified" | "pending" | "missing" | "inconsistent";
    note: string;
  }[];
  redFlags: string[];
  adminNotes: {
    author: string;
    body: string;
    at: string;
  }[];
};
