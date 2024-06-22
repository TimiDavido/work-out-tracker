import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne , JoinColumn} from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { Comment } from "./Comment";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('timestamp')
  starttime: Date;
  
  @Column('timestamp')
  endtime: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @OneToMany(() => Workout, (workout) => workout.session)
  workouts: Workout[];

  @OneToMany(() => Comment, (comment) => comment.session)
  comments: Comment[];
}
