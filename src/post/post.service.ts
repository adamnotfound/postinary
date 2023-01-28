import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: createPostInput,
    });
  }

  findAll() {
    return this.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostInput.title,
        content: updatePostInput.content,
        picture: updatePostInput.picture,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
