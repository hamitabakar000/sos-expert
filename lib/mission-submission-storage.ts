export type SubmittedMissionStatus = "pending_review" | "reviewing" | "approved" | "needs_information";

export type SubmittedMission = {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  domain: string;
  urgency: string;
  description: string;
  mode: string;
  budget: number;
  language: string;
  confidentiality: string;
  attachments: {
    name: string;
    size: number;
    type: string;
  }[];
  status: SubmittedMissionStatus;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "sos-expert-submitted-missions";
export const MISSIONS_UPDATED_EVENT = "sos-expert-missions-updated";

export function getSubmittedMissions(): SubmittedMission[] {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveSubmittedMission(mission: SubmittedMission) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([mission, ...getSubmittedMissions()]));
  window.dispatchEvent(new Event(MISSIONS_UPDATED_EVENT));
}

export function updateSubmittedMissionStatus(id: string, status: SubmittedMissionStatus) {
  const missions = getSubmittedMissions().map((mission) =>
    mission.id === id ? { ...mission, status, updatedAt: new Date().toISOString() } : mission
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  window.dispatchEvent(new Event(MISSIONS_UPDATED_EVENT));
}
