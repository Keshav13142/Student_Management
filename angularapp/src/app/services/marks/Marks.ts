import { Student } from '../Student/Student';

export interface Marks {
  entryId: string;
  entryNumber: number;
  marks: number;
  description: string;
  datedOn: Date;
  remark: string;
  status: string;
  image: any;
  submittedBy: Student;
  reviewedBy: string;
}
