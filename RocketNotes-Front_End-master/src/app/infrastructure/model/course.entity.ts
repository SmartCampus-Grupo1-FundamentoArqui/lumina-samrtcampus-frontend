export interface Course {
  id?: number;
  name: string;
  classroomId: number;
  teacherId?: number;
  schedule: string;
  imageUrl?: string;
}
