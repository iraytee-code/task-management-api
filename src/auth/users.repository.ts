import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { SignupCredentialsDto } from "./dto/signup-credentials.dto";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(SignupCredentialsDto: SignupCredentialsDto): Promise<void> {
    const { firstname, lastname, username, password } = SignupCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(`Username already exist`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
