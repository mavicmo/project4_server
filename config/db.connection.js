import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://mtaraq:mtaraq@cluster0.eqoyi.mongodb.net/project4?retryWrites=true&w=majority';

//Connect to MongoDb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...!'))
    .catch(err => console.log(`MongoDB connection error :(', err')`));

mongoose.connection.on('disconnected', err => console.log(err));