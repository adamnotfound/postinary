import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field({ nullable: true })
  content?: string;
  @Field({ nullable: true })
  picture?: string;
}
