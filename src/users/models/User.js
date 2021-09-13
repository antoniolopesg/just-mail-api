import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
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
    { tableName: 'users', underscored: true }
  );
};
