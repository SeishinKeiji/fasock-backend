import * as bcrypt from "bcrypt";
import { GeneralEntity } from "#database/general.entity";
import { Column, Entity, BeforeInsert } from "typeorm";

export interface IUserPayload extends Omit<UserEntity, "id" | "hashPW" | "created_at" | "updated_at"> {}
export interface IUserData extends Omit<UserEntity, "hashPW"> {}

@Entity({ name: "users" })
export class UserEntity extends GeneralEntity {
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
