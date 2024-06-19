import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @ManyToOne(() => User, (user) => user.comment)
    user: User

    @ManyToOne(() => Workout, (workout) => workout.comment)
    workout: Workout
}
