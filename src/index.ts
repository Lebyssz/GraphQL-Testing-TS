import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://Lebyzio:Lebyzio@cluster-testing.cvmkhhv.mongodb.net/?retryWrites=true&w=majority";

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
    listen: { port: 8000 },
}).then(({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
});
