import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { Session } from "./Session";

export enum CommentType {
    SESSION = 'session',
    WORKOUT = 'workout'
}
@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string
    
    @Column({ type: "enum", enum: CommentType })
    type: CommentType; 

    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @ManyToOne(() => Workout, (workout) => workout.comment, {nullable: true})
    workout: Workout

    @ManyToOne(() => Session, (session) => session.comments, {nullable: true})
    session : Session
}
