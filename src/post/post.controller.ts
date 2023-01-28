import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostService } from './post.service';
import { Post as post } from './post.interface';
import { UpdatePostInput } from './dto/update-post.input';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(id, updatePostInput);
  }
  @Get()
  public async findAll(): Promise<post[]> {
    return this.postService.findAll();
  }
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
