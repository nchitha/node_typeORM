import {Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn,OneToMany} from "typeorm";
import { Profile } from "./Profile";
import {Photo} from "./Photo";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
    @OneToOne(() => Profile,{
        onDelete: "CASCADE", // <---- HERE
        cascade: true
      })
    @JoinColumn()
    profile: Profile;
    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];
}
