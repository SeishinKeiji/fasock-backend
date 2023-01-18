import { Seeder } from "@jorgebodega/typeorm-seeding";
import { UserEntity } from "#modules/v1/user/user.entity";
import { DataSource } from "typeorm";
export default class UserSeeder extends Seeder {
  public async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    const user = userRepository.create({ username: "shinigami", email: "test@c.c", password: "verysecr3t" });
    userRepository.save(user);
  }
}
