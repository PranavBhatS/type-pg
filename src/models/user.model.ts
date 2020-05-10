import {
    Table, Column, Model, HasMany, DataType,
    PrimaryKey, IsUUID, Unique, AutoIncrement
} from 'sequelize-typescript';

@Table({
    timestamps:false
})
export default class User extends Model<User> {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUIDV4
    })
    id?: any

    @Column({
        type: DataType.TEXT, allowNull: false, unique: true
    })
    fullName!: string;

    @Column({
        type: DataType.TEXT, allowNull: false, unique: true
    })
    userName!: string;

    @Column({
        type: DataType.TEXT, allowNull: false
    })
    password!: string
}