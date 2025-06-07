export class Classroom {
  id: number;
  section: string;
  classroom: string;
  capacity: number;
  enrolled_students: number;

  constructor() {
    this.id = 0;
    this.section = '';
    this.classroom = '';
    this.capacity = 0;
    this.enrolled_students = 0;
  }
}
