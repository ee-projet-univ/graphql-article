import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import User from "./models/User";
import Article from "./models/Article";
import Comment from "./models/Comment";
import schema from "../graphql";

const options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql",
  playground: "/playground"
};

const models = {
    Article,
    Comment,
    User
}

const context = {
  models,
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    'mongodb://localhost/conduit',
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new GraphQLServer({
  schema,
  context
});

server.start(options, ({ port }) => {
  console.log(`🚀  Server is running on http://localhost:${port}`);
});