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

    @Column({default: 'not done'})
    status: string

    @Column({nullable: true})
    size : string

    @ManyToOne(() => Session, (session) => session.workout)
    session: Session

    @ManyToOne(() => Exercise, (exercise) => exercise.workout)
    exercises: Exercise[]

    @OneToMany(() => Comment, (comment) => comment.workout)
    comment: Comment[]
}