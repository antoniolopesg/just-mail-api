import { hash } from 'bcryptjs';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'email already in use'
        },
        validate: {
          isEmail: true,
          contains: {
            args: ['@justmail.com'],
            msg: 'email must use justmail.com domain'
          },
          notEmpty: {
            args: true,
            msg: 'email must not be empty'
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3],
            msg: 'firstName must contain at least 3 characters'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3],
            msg: 'lastName must contain at least 3 characters'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: 'password must contain at least 8 characters'
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      underscored: true,
      hooks: {
        async beforeSave(user) {
          const hashedPassword = await hash(user.password, 8);
          user.password = hashedPassword;
        }
      }
    }
  );
};
