import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne , JoinColumn} from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('time')
  starttime: string
  
  @Column('time')
  endtime: string

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @OneToMany(() => Workout, (workout) => workout.session)
  workout: Workout[];
}
