const Book = require('../models/Book');

// Syntax for set type parameters
// {params}: {params: any}

const resolvers = {
    Query: {
        async book(_: any, {ID}: {ID: any}) {
            return await Book.findById(ID)
        },
        async getBooks(_: any, {amount}: {amount: number}) {
            return await Book.find().sort({createAt: -1}).limit(amount)
        }
    },

    Mutation: {
        async createBook(_: any, {bookInput: {name, author, price}}: {bookInput: {name: string, author: string, price: number}}) {
            const createBook = new Book({
                name: name,
                author: author,
                price: price,
                createAt: new Date().toISOString(),
            });

            const res = await createBook.save(); // MongoDB Saving
            //console.log(res._doc);
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteBook(_: any, {ID}: {ID: any}) {
            const wasDeleted = (await Book.deleteOne({_id: ID})).deleteCount;
            return wasDeleted; // 1 = Deleted, 0 = Nothing Deleted
        },
        async editBook(_: any, {ID, bookInput: {name, author, price}}: {ID: any, bookInput: {name: string, author: string, price: number}}) {
            const wasEdited = (await Book.updateOne({_id: ID}, {name: name, author: author, price: price})).modifiedCount;
            return wasEdited; // 1 = Edited, 0 = Nothing Deleted
        }
    }
}

// *** Still bug about type of params ***

module.exports = { resolvers }