import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm'
import { Usuario } from './Usuario';

@Entity('nivel')
export class Nivel extends BaseEntity{

    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: number;

    @Column("varchar", { length: 45 })
    nombre: string;


    @Column("tinyint", { width: 1 , default: 1})
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany( () => Usuario, usuario => usuario.nivel )
    usuarios: Usuario[];
}