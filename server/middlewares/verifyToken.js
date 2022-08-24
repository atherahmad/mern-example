import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.send('Forbidden !!');
        // const payload = await jwt.verify(token, process.env.SECRET);
        // req.userId = payload?.id;
        // next();
        await jwt.verify(token, process.env.SECRET, (err, payload) => {
            if (err) throw err; // new Error(err.message);
            req.user = payload;
            next();
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({message: err.message});
    }
}