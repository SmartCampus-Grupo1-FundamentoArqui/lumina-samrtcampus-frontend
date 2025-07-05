export interface Grade {
  id: number;
  name: string;
  level: string;
}

export class Classroom {
  id: number;
  section: string;
  roomNumber: string;
  imageUrl?: string;
  capacity: number;
  currentSize: number;
  grade: Grade;
  gradeId?: number; // Para compatibilidad con el backend

  constructor() {
    this.id = 0;
    this.section = '';
    this.roomNumber = '';
    this.imageUrl = '';
    this.capacity = 0;
    this.currentSize = 0;
    this.grade = { id: 0, name: '', level: '' };
  }
}
