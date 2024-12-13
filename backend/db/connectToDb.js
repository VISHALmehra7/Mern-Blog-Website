import mongoose from 'mongoose'

async function connectToMongodb() {
    try {
      await  mongoose.connect(process.env.DATABASE_URI)
        console.log("Connected To DB");
        
    } catch (error) {
        console.log("Error connecting to DB",error);
        
    }
}
export default connectToMongodb