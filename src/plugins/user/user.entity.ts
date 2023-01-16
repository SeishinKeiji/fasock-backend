import * as bcrypt from "bcrypt";
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from "typeorm";

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

  @BeforeInsert()
  async hashPW() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
  }
}
