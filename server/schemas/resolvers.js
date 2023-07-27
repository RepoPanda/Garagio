const User = require('../models/Ads');
const Ads = require('../models/User');

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
        
    }
}


module.exports = resolvers;