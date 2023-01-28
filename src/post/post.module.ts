import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { PostController } from './post.controller';
@Module({
  controllers: [PostController],
  providers: [PostResolver, PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
