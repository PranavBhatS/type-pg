import {
    Table, Column, Model, HasMany, DataType,
    PrimaryKey, IsUUID, Unique, AutoIncrement, Sequelize
} from 'sequelize-typescript';

@Table({
    timestamps: true
})
export default class User extends Model<User> {
    @IsUUID("4")
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
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
    password!: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: 'active'
    })
    status!: string
}

