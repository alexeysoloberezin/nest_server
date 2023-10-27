import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";

interface UserCreationAttrs{
    email: string,
    password: string,
}

interface UserType {
    id: number,
    email: string,
    password: string,
    banned: Boolean,
    banReason: string,
}

@Table({tableName: 'users'})
export class User extends Model<UserType, UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'Unique Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@gmail.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string;

    @ApiProperty({example: '123456', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: true})
    password: string;

    @ApiProperty({example: true, description: 'User status banned or not'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Bad boy', description: 'Banned status message'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}