import { Model, Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

console.log(process.env.USER);

const s = new Sequelize(
  process.env.DB!,
  process.env.USERNAME!,
  process.env.PASS!,
  {
    host: process.env.HOST!,
    port: Number(process.env.PORT! || 5432),
    dialect: "postgres",
  }
);

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: s, tableName: "users" }
);

User.beforeCreate(async (user: User) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
export { s };
