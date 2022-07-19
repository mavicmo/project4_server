const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI ||
  "mongodb+srv://mtaraq:mtaraq@cluster0.eqoyi.mongodb.net/project4?retryWrites=true&w=majority";

//Connect to MongoDb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected...!"))
  .catch((err) => console.log(`MongoDB connection error :(', err')`));

const Schema = mongoose.Schema;

var Things = new Schema({
  animal: {
    type: String,
  },
});

var ThingsModel = mongoose.model("ThingsModel", Things);

var Demo = new Schema({
  name: {
    type: String,
  },
  stuff: {
    type: [String],
  },
  things: {
    type: [{ type: Schema.Types.ObjectId, ref: "ThingsModel" }],
  },
});

var DemoModel = mongoose.model("DemoModel", Demo);
