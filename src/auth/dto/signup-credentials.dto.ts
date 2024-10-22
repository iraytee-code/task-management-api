import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignupCredentialsDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  firstname: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  lastname: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  username: string;

  @MinLength(8)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password is too weak",
  })
  password: string;
}
