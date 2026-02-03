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

export interface MarkDonationDetails {
  // mark_donations
  id: number;
  request_id: number;
  assigned_donor_id: number;
  action: 'donated' | 'timeout'; // could use union type for better type safety
  donated_quantity: number;
  created_at: string; // ISO string from TIMESTAMPTZ

  // blood_request_donors
  donor_status: string; // status of donor for this request

  // blood_requests
  hospital: string;
  location: string;
  blood_group: string;

  // donors
  pic: string;
  donor_user_id: number; // user_id of donor
  address: string;

  // donor user
  donor_name: string;
  donor_email: string;
  donor_phone: string;

  // patient user
  patient_name: string;
  patient_email: string;
  patient_phone: string;
}



// "pending" | "searching" | "assigned" | "completed" | "expired";

