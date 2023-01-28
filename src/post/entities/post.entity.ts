import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
  @Field({ defaultValue: 'Hello from null' })
  title: string;
  @Field({ nullable: true })
  content?: string;
  @Field({ nullable: true })
  picture?: string;
  @CreateDateColumn()
  @Field()
  createdAt: Date;
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
