import { gql } from "@apollo/client";

export const POST_AD = gql`
mutation postAd($title: String, $description: String, $image: String, $price: Float, $quantity: Int, $location: String, $sold: Boolean) {
  postAd(title: $title, description: $description, image: $image, price: $price, quantity: $quantity, location: $location, sold: $sold) {
    _id
    title
    description
    image
    price
    quantity
    location
    sold
  }
}`

export const CREATE_USER = gql`
mutation createUser($username: String, $email: String, $password: String, $isSeller: Boolean) {
  createUser(username: $username, email: $email, password: $password, isSeller: $isSeller) {
    token
    user {
      _id
      username
      email
      password
      ads {
        _id
      }
    }
  }
}`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      isSeller
    }
  }
}`;
