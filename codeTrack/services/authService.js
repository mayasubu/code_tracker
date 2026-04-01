const User = require('../models/userModel');

exports.registerUser = async (userData) => {
    try {
        const existingUser = await User.findOne({ 
            $or: [{ email: userData.email }, { registerNumber: userData.registerNumber }] 
        });
        
        if (existingUser) {
            throw new Error('User with this email or register number already exists');
        }

        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        return user;
    } catch (error) {
        throw error;
    }
};
