import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm'
import { Nivel } from './Nivel';
// import { User_Type } from './User_Type';
// import { Request } from './Request';
// import { Meeting } from './Meeting';
import {encryptPassword} from "../libs/Encryptation"

@Entity('usuario')
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: number;

    @Column("varchar", { length: 45 })
    nombre: string;

    @Column("varchar", { length: 45 })
    appellido_paterno: string;

    @Column("varchar", { length: 45 })
    appellido_materno: string;

    @Column("varchar", { length: 45 })
    nickname: string;

    @Column("varchar", { length: 100 , nullable: true, select: false})
    password: string;

    @Column("tinyint", { width: 1 , default: 1})
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne( () => Nivel, nivel => nivel.usuarios , { onDelete: 'RESTRICT', nullable: false})
    @JoinColumn({ name: 'nivel' })
    nivel: Nivel;

    @BeforeInsert()
    async setPassword(){
        this.password = await encryptPassword(this.password);
    }
}