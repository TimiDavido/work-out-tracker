import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Session } from "./Session";
import { Exercise } from "./Exercise";
import { Comment } from "./Comment";

@Entity()
export class Workout {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    reps: number

    @Column()
    sets: number

    @Column({
        type: 'enum',
        enum: ['completed', 'not done'],
        default: 'not done'
      })
      status: 'completed' | 'not done';

    @Column({nullable: true})
    size : string

    @ManyToOne(() => Session, (session) => session.workouts)
    session: Session

    @OneToMany(() => Exercise, (exercise) => exercise.workout)
    exercises: Exercise[]

    @OneToMany(() => Comment, (comment) => comment.workout)
    comment: Comment[]
}