import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import ProjectSchema, { Project } from './schema/project.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UserSchema, { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ProjectService , UserService],
  controllers: [ProjectController],
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  exports: [],

})
export class ProjectModule {}
