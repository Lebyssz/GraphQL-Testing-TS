"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
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
}).catch((err) => {
    console.log(err.message);
});
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 8000 },
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
