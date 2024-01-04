export interface classProps {
  id: string;
  name: string;
  avilableSeats: number;
  totalSeats: number;
  removeClass: (classId: string) => Promise<void>;
}
