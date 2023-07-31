const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not Logged In');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne ({email});
            if (!user) {
                throw new AuthenticationError('No User With This Email Found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong Password');
            }
            const token = signToken(user);
            return{ token, user };
        },
        saveBook: async(parent, { newBook }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { savedBooks: newBook}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You Must Be Logged In!');
        },
        removedBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    {$pull: { savedBooks: {bookId: bookId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You Must Be Logged In!');
        },
    },
};
module.exports = resolvers;
