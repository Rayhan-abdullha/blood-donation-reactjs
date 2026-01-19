export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-"

export interface BloodRequest {
  id: number
  bloodGroup: BloodGroup
  hospital: string
  urgency: "Normal" | "Emergency"
}
