const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// here we create the User model
class Users extends Model {
    
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Users.init(
    {
        // ID column
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        // USER colum
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        github: {
            type: DataTypes.STRING,
            allowNull: true
        },

        // EMAIL column
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        // PASSWORD column
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [4]
          }
        }
      },
  {
      hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData;
        },
          // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updUserData) {
            updUserData.password = await bcrypt.hash(updUserData.password, 10);
            return updUserData;
        }
      },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'users'
  }
);

module.exports = Users;