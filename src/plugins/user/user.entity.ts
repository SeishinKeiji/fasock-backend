import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

export interface IUser extends Omit<UserEntity, "id"> {}

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
