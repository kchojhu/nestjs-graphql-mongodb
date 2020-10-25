import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput) {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });
    return this.studentRepository.save(student);
  }

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }

  getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneOrFail({ id });
  }
}
