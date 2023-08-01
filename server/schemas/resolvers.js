const {User, Ads} = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } =require('apollo-server-express');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        ads: async () => {
            return await Ads.find({});
        },
        secret: async (_, args, context) => {
            if (context.user) {
                return 'Secret message!'
            } else { 
                throw new AuthenticationError('You need to be logged in!')
            }
        }
    },
    Mutation: {
        postAd: async (_, args) => {
            return await Ads.create(args);
        },
        createUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token }
            
        },
        login: async (_, { email, password }) => { 

            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);

            return { user, token }
        }
            
    }
}


module.exports = resolvers;