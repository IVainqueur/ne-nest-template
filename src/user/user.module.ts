import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
