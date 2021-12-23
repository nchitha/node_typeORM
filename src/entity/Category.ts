import { Entity, PrimaryGeneratedColumn, Column,ManyToMany } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @ManyToMany(() => Question, question => question.categories, {
        cascade: true
    })
    question: Question[];
}