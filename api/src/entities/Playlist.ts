import { User } from './User';
import { Song } from './Song';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("playlist")
export class Playlist{
    @PrimaryGeneratedColumn('uuid')
    id?:string;

    @Column()
    name:string;

    @ManyToMany(type => Song,s=>s.playlists)
    songs:Song[];

    @ManyToOne(type=>User,u=>u.ownPlaylists)
    owner:User;

    @ManyToMany(type=>User,u=>u.savedPlaylists)
    listeners:User[];

    @Column({nullable:true})
    logo:string;
}