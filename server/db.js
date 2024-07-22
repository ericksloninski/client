import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI não está definida");
        }
        console.log(`Tentando conectar ao MongoDB com a URI: ${mongoUri}`);
        const connect = await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export default connectToDatabase;