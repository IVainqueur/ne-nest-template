import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateUserDTO } from "./dto/updateuser.dto";
import { UserService } from "./user.service";
import { RolesGuard } from "src/utils/guards/roles.guard";
import { Roles } from "src/utils/decorators/roles.decorator";
import { UserRole } from "./dto/signup.dto";

@ApiTags("users")
@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "The users have been successfully retrieved.",
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a user by id" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Not Found." })
  async findById(@Param("id") id: number) {
    return this.userService.findById(id);
  }

  @Put(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user by id" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Not Found." })
  async updateById(
    @Param("id") id: number,
    @Body() updateUserData: UpdateUserDTO
  ) {
    return this.userService.updateById(id, updateUserData);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a user by id" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Not Found." })
  async deleteById(@Param("id") id: number) {
    return this.userService.deleteById(id);
  }
}
