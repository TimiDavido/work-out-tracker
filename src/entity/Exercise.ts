import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Workout } from "./Workout";

@Entity()
export class Exercise{
    @PrimaryGeneratedColumn()
    id : number

    @Column() 
    name : string

    @Column({nullable: true})
    description: string

    @ManyToOne(() => Workout, (workout) => workout.session)
    workout: Workout
}