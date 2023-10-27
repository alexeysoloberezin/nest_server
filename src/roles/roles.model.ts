import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-role.model";

interface RoleCreationAttrs{
    value: string,
    description: string,
}


@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example: '1', description: 'Unique Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'admin role', description: 'Role description'})
    @Column({type: DataType.STRING,  allowNull: true})
    description: string;

    @ApiProperty({example: 'ADMIN', description: 'User Role'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    value: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}