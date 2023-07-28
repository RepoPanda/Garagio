const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Ads {
_id: ID
title: String!
description: String!
image: String
price: Float!
quantity: Int!
location: String!
sold: Boolean!
}

type User {
_id: ID
username: String!
email: String!
password: String!
ads: [Ads]
}

type Query {
ads: [Ads]
users: [User]
}

type Mutation {

postAd(
title: String,
description: String,
image: String,
price: Float,
quantity: Int,
location: String,
sold: Boolean
): Ads

}
`;


module.exports = typeDefs;