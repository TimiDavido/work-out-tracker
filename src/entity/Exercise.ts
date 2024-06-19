import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Workout } from "./Workout";

@Entity()
export class Exercise{
    @PrimaryGeneratedColumn()
    id : number

    @Column() 
    name : string

    @Column({nullable: true})
    description: string

    @OneToMany(() => Workout, (workout) => workout.session)
    workout: Workout
}