export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-"
export type BloodRequest = {
  id: number;
  user_id: number;
  blood_type: string;          // e.g. "A+"
  quantity: number;            // number of bags
  hospital: string;
  phone: string;
  location: string;
  urgency: "urgent" | "non-urgent";
  description: string;
  status: string;
  assigned_donor_id: number | null;
  expires_at: string;          // ISO date string
  created_at: string;          // ISO date string
  updated_at: string;          // ISO date string
  name: string;
  email: string;
};


// "pending" | "searching" | "assigned" | "completed" | "expired";

