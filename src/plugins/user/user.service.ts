import { datasource } from "database";
import { Repository } from "typeorm";
import { UserRepository as UserEntity } from "./user.entity";

export class UserService {
  private UserRepository: Repository<UserEntity>;
  constructor() {
    this.UserRepository = datasource.getRepository(UserEntity);
  }

  async users(): Promise<UserEntity[]> {
    return await this.UserRepository.find();
  }
}
