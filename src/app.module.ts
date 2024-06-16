import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module"; // Import UserModule

@Module({
  imports: [AuthModule, UserModule], // Add UserModule to imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
