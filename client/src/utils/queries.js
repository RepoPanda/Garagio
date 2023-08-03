import{gql} from "@apollo/client";

export const USERS = gql`
query users {
  users {
    _id
    username
    email
    password
    ads {
      _id
    }
    isSeller
  }
}`;
export const ADS = gql`
query ads {
  ads {
    _id
    title
    description
    image
    price
    quantity
    location
    sold
  }
}`;

export const ME = gql`
query me {
  me {
    _id
    username
    email
    ads {
      _id
      title
      description
      image
      price
      quantity
      location
      sold
    }
    isSeller
  }
}`;