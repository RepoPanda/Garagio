const {User, Ads} = require('../models');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        ads: async () => {
            return await Ads.find({});
        }
    },
    Mutation: {
        postAd: async (_, args) => {
            return await Ads.create(args);
        }
    }
}


module.exports = resolvers;