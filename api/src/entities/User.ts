import { Column, Entity, ManyToOne,ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Playlist } from "./Playlist";
import { Song } from "./Song";

@Entity()
@Unique(['email'])
export class User{
    @PrimaryGeneratedColumn('uuid')
    id?:string;

    @Column()
    nickname:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({nullable:true})
    imageUrl?:string;

    @OneToMany(type => Song,s=>s.uploader,{onDelete:"SET NULL"})
    uploadedSongs:Song[];

    @OneToMany(type=>Playlist,p=>p.owner)
    ownPlaylists:Playlist[];

    @ManyToMany(type=>Playlist,p=>p.listeners)
    savedPlaylists:Playlist[];
}