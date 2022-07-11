import gql from 'graphql-tag';

export const GET_PRODUCT_BY_ID = gql
`query getProduct {
    products(where: {id: {_eq: 1}}) {
      id
      category
      description
      image
      price
      rating_count
      rating_rate
      title
    }
  }`;

export const GET_LOGIN = gql`
query login($email: String!, $password: String!) {
  users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    password
    email
  }
}`;


export const GET_PRODUCTS_HOME = gql
`query getFiveProducts {
    products(limit: 5) {
      id
      image
      title
    }
  }`;

export const GET_FEATURED_PRODUCTS = gql`
query getFeaturedProducts {
  products_table(where: {featured: {_eq: true}}, limit: 5, order_by: {id: asc}) {
    images
    name
    parent
    regular_price
    sku
    id
  }
}`;

export const GET_PRODUCT_FOR_MODAL_BY_ID = gql`
query getProductForModalByID($id: Int) {
  products_table(where: {id: {_eq: $id}}) {
    attribute_1_name
    attribute_1_value
    attribute_2_name
    attribute_2_value
    attribute_3_name
    attribute_3_value
    attribute_4_name
    attribute_4_value
    attribute_5_name
    attribute_5_value
    description
    id
    images
    name
    parent
    regular_price
    short_description
    sku
    weight
    width
    height
    length
    stock
  }
}`
export const GET_ALL_PRODUCTS_LIMIT = gql`
  query GetAllProducts {
    products(limit: 100) {
      id
      category
      description
      price
      title
      rating_rate
    }
  }`;

export const GET_CURRENT_USER = gql`
query getCurrentUser($email: String) {
  users(where: {email: {_eq: $email}}) {
    email
    name
    password
  }
}`;

export const UPDATE_USER_SETTINGS = gql`
mutation updateUserSettings($email: String, $set: users_set_input = {name: "", password: "", email: ""}) {
  update_users(_set: $set, where: {email: {_eq: $email}}) {
    returning {
      email
      name
      password
    }
  }
}`;

export const CHECK_IF_EMAIL_EXISTS = gql`
query checkIfEmailExists($email: String) {
  users(where: {email: {_eq: $email}}) {
    email
  }
}`;
export default GET_LOGIN;