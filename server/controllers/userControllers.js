import bcrypt from 'bcryptjs';

// importing custom modules
import User from '../models/User.js';
import { createToken } from '../helpers/createToken.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} returns a response 
 * @desc registiration request controller
 */
export const signup = async (req, res) => {
    const { email, password, confirmPassword, username } = req.body;
    try {
        // check for existing user with this email
        const existingUser = await User.findOne({ email }); 
        if (existingUser) return res.status(400).json({ message: "Email already exist" });
        // if the password and confirmPassword is matching
        if (password !== confirmPassword) return res.status(400).json({ message: "Passowrds don't match" });
        const hashPassword = await bcrypt.hash(password, 12);
        const Id = (await User.find()).length + 1; // optional for other ideas
        const savedUser = await User.create({
            email,
            password: hashPassword,
            username, // not used as credentials
            id: Id
        });

        // creating a token
       const token = createToken({
            username,
            id:Id
       });
        
        // encrypt or hash the token then send it to frontend

        res.status(200).json({savedUser, token});
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            error : err.message });
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {void}
 * @desc sign in request controller
 */
export const signin = async (req, res) => {
    // sign in with email and password
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "Wrong sign in data" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)  return res.status(404).json({ message: "Wrong sign in data" });
        
        const token = createToken({
            username: existingUser.username,
            id: existingUser.id
        });

        res.status(200).json({
            token,
            user: {
                 username: existingUser.username,
                 id: existingUser.id
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            error: err.message
        });
    }
}


export const tokenValidator = (req, res) =>{
    res.json(req.user)
}