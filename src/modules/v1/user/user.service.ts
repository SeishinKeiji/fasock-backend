import { Repository } from "typeorm";
import { datasource } from "#database";
import { IUserData, IUserPayload, UserEntity } from "./user.entity";
export class UserService {
  private UserRepository: Repository<UserEntity>;
  constructor() {
    this.UserRepository = datasource.getRepository(UserEntity);
  }

  async getUsers(): Promise<IUserData[]> {
    return await this.UserRepository.find();
  }

  async getUser(id: number): Promise<IUserData | null> {
    return await this.UserRepository.findOne({ where: { id } });
  }

  async create(user: IUserPayload): Promise<IUserData> {
    return await this.UserRepository.save(user);
  }

  async update(id: number, data: Partial<IUserPayload>): Promise<IUserData> {
    let user = await this.UserRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found!");
    return await this.UserRepository.save({
      id,
      ...data,
    });
  }

  async delete(id: number) {
    return await this.UserRepository.delete(id);
  }
}
