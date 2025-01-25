export interface Quiz {
    _id?: string; // Make _id optional since it will be assigned by MongoDB later
    name: string;
    roomCode: string;
    selectedQuizzes: string[];
    timer: number;
    createdAt?: Date;
  }
  