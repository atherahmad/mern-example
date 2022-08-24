import mongoose from 'mongoose';
import dotenv from 'dotenv';

// loading environment variables
dotenv.config();


/**
 * connecting sync : for teaching pruposes
 */
export const connectSync = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(
            () => console.log('connected to db')
        )
        .catch(
            err => console.log("Connection to MongoDB has faild ", err.message)
    );
    
    // it waits for the promise to be evaluated ...
}


/**
 * connecting Async : best practise
 */
export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        //all code here is evaluated  we don't wait

    }
    catch (error) {
        console.log("Connection to MongoDB has faild ", error.message);
    }
    
}
