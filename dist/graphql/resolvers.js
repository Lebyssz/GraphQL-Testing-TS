"use strict";
const Book = require('../models/Book');
// Syntax for set type parameters
// {params}: {params: any}
const resolvers = {
    Query: {
        async book(_, { ID }) {
            return await Book.findById(ID);
        },
        async getBooks(_, { amount }) {
            return await Book.find().sort({ createAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        async createBook(_, { bookInput: { name, author, price } }) {
            const createBook = new Book({
                name: name,
                author: author,
                price: price,
                createAt: new Date().toISOString(),
            });
            const res = await createBook.save(); // MongoDB Saving
            //console.log(res._doc);
            return Object.assign({ id: res.id }, res._doc);
        },
        async deleteBook(_, { ID }) {
            const wasDeleted = (await Book.deleteOne({ _id: ID })).deleteCount;
            return wasDeleted; // 1 = Deleted, 0 = Nothing Deleted
        },
        async editBook(_, { ID, bookInput: { name, author, price } }) {
            const wasEdited = (await Book.updateOne({ _id: ID }, { name: name, author: author, price: price })).modifiedCount;
            return wasEdited; // 1 = Edited, 0 = Nothing Deleted
        }
    }
};
// *** Still bug about type of params *** (ง่าย ๆ คือ ไม่ควรใช้ type "Any" ในการระบุตัวแปร)
module.exports = { resolvers };
