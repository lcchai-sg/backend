import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch(error) {
        console.log(error);
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No Users Found!" });
    }
    return res.status(200).json({users});
}

export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead."});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({ name, email, password: hashedPassword });
    try {
        await user.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
    return res.status(201).json({ user });
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Does Not Exist."});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Login ID or Password is Incorrect!" });
    }
    return res.status(200).json({ message: "Login Successful." });
}