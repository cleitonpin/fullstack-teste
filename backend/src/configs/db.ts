import mongoose from 'mongoose';

let database: mongoose.Connection;

export const connect = () => {
    const uri = process.env.URI as string;

    if (database)
        return;

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });

    database = mongoose.connection;

    database.once('open', () => {
        console.log('Connected to database');
    });

    database.once('error', () => {
        console.log('Error connecting to database');
    })
}

export const disconnect = () => {
    if (!database)
        return;

    mongoose.disconnect();
}