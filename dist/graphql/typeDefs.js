"use strict";
const { gql } = require('apollo-server');
const typeDefs = gql `
type Book {
    name: String
    author: String
    price: Int
    createAt: String
}

input BookInput {
    name: String
    author: String
    price: Int
}

type Query {
    book(ID: ID!): Book!
    getBooks(amount: Int): [Book]
}

type Mutation {
    createBook(bookInput: BookInput): Book!
    deleteBook(ID: ID!): Boolean
    editBook(ID: ID!, bookInput: BookInput): Boolean
}
`;
module.exports = { typeDefs };
