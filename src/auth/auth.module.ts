import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}