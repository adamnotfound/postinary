import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  content?: string;
  @Field({ nullable: true })
  picture?: string;
}
