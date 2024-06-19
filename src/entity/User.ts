import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Session } from "./Session";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "client" })
  role: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];
}
