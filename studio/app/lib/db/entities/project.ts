import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Project {
  // id
  // name
  // description
  // created_at
  // updated_at
  // user_id -> User.id

  @PrimaryGeneratedColumn()
  id!: number;

  @Column() name!: string;
  @Column() description!: string;

  @ManyToOne(() => User, (user) => user.projects)
  user!: User;

  @CreateDateColumn() created_at!: Date;
  @UpdateDateColumn() updated_at!: Date;
}
