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
        },
        me: async (_, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('ads');
            } else { 
                throw new AuthenticationError('You need to be logged in!')
            }

        }
    },
    Mutation: {
        postAd: async (_, args, context) => {
            const ad = await Ads.create(args);

            // const me = await User.findById(context.user._id);
            // me.ads.push(ad._id);
            // me.save();

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { ads: ad._id } },
                { new: true }
            );

            return ad;
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