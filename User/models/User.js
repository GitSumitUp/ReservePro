import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import { sequelize } from '../../config/dbConnection.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Can be 'user' or 'admin'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Users',
    timestamps: false
});

// Hash password before saving
User.beforeCreate(async (user) => {
    user.password = await bcryptjs.hash(user.password, 10);
});

export default User;
