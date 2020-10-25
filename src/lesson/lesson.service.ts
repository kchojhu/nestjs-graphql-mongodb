import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name: createLessonInput.name,
      startDate: createLessonInput.startDate,
      endDate: createLessonInput.endDate,
      students: createLessonInput.students,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLessons(): Promise<Lesson[]> {
    console.log('here');
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOneOrFail({ id });
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneOrFail({ id: lessonId });
    lesson.students = [
      ...(lesson.students ? lesson.students : []),
      ...studentIds,
    ];
    return this.lessonRepository.save(lesson);
  }
}
