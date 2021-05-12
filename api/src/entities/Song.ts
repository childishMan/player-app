import { User } from './User';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from './Playlist';

@Entity("song")
export class Song{
    @PrimaryGeneratedColumn('uuid')
    id?:string;

    @Column()
    name:string;

    @Column()
    artists:string;

    @ManyToOne(type=>User,u=>u.uploadedSongs)
    uploader:User;

    @Column({nullable:true})
    coverUrl:string;

    @ManyToMany(type=>Playlist,p=>p.songs)
    playlists:Playlist[];

    @Column()
    songUrl:string;

    @Column({default:false})
    isPublic:boolean;

    @CreateDateColumn()
    uploadedAt?:Date;
}