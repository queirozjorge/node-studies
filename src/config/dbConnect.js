import mongoose from "mongoose";

async function connectDatabase() {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.5ycgw.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0");
    return mongoose.connection;
}

export default connectDatabase;
