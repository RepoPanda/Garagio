const { gql } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
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

type Auth {
token: ID!
user: User
}

type User {
_id: ID
username: String!
email: String!
password: String!
ads: [Ads]
isSeller: Boolean!
}

type Query {
ads: [Ads]
users: [User]
secret: String
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

createUser(
username: String,
email: String,
password: String,
isSeller: Boolean
): Auth

login (
	email: String!, 
    password: String!
): Auth
}
`;


module.exports = typeDefs;