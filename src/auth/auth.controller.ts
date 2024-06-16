import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/user/user.service";
import { LoginDto } from "../user/dto/login.dto";
import { SignUpDto } from "../user/dto/signup.dto";
import { ApiBody } from "@nestjs/swagger";
import { AUTH_API_SAMPLES } from "./data/samples";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Post("signup")
  @ApiOperation({ summary: "Sign up a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({
    type: SignUpDto,
    examples: {
      ...AUTH_API_SAMPLES.signup,
    },
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Log in a user" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully logged in.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiBody({
    type: LoginDto,
    examples: {
      ...AUTH_API_SAMPLES.login,
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
