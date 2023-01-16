import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "users" })
export class UserRepository {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
