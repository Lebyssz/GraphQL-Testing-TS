import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//const mongoose = require('mongoose');
//const MONGO_URI = "mongodb+srv://Lebyzio:Lebyzio@cluster-testing.cvmkhhv.mongodb.net/?retryWrites=true&w=majority"
const typeDefs = `#graphql
type Book {
    title: String
    author: String
}

type Query {
    books: [Book]
}
`;
const books = [
    {
        title: 'The Prince',
        author: 'Niccolo Machievelli'
    },
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    }
];
const resolvers = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
});
console.log(`🚀  Server ready at: ${url}`);
