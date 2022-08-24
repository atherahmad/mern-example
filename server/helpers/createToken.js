import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// to create a good jwt secret use this command :
// require('crypto').randomBytes(64).toString('hex');

/**
 * 
 * @param {Object } payload user unsensitive data
 * @returns {String} the token
 */
export const createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: '360s'
    });
}