import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
const mongoose = require('mongoose');

dotenv.config()

// MongoDB URI
const MONGODB = process.env.MONGODB_URI;

// Apollo Server Setup
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connection Successful");
}).catch((err: {message: any}) => {
    console.log(err.message);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: {port: 4000},
}).then(({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
});
