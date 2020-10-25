import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';
import { LessonType } from '../lesson/lesson.type';
import { Lesson } from '../lesson/lesson.entity';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // @Query(returns => [LessonType])
  // lessons(): Promise<Lesson[]> {
  //   return this.lessonService.getLessons();
  // }
  //
  // @Query(returns => LessonType)
  // lesson(@Args('id') id: string) {
  //   this.lessonService.getLesson(id);
  //
  //   return {
  //     id: 'idfdi',
  //     name: 'Physics Class',
  //     startDate: new Date().toISOString(),
  //     endDate: new Date().toISOString(),
  //   };
  // }

  @Query(returns => [StudentType])
  students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query(returns => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
