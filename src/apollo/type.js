import gql from "graphql-tag";

export default `
  type User{
    id: Int!
    name: String!
    avatar: String
    createdAt: Int!
    age: Int
    gender: String!
    active: Boolean!,
    updateAt:Int 
  }

  type Mutation {
    add(id: Int!,name: String! ,age: Int,createdAt: Int!,gender: String!,active: Boolean!): User
    del(id: Int):User 
    update(id:Int!,name:String!,age:Int,updateAt:Int!,gender:String!,active:Boolean!):User
  }
  type Query {
    users:[User]
  }
`;

export const ADD_USER = gql`
  mutation($name: String!, $age: Int!, $gender: String!) {
    add(name: $name, age: $age, gender: $gender) @client {
      name
      age
      gender
    }
  }
`;

export const DEL_USER = gql`
  mutation($id: Int!) {
    del(id: $id) @client {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: Int!) {
    update(id: $id) @client {
      id
    }
  }
`;

export const USERS_QUERY = gql`
  query UserQuery {
    users @client {
      id
      name
      avatar
      createdAt
      updatedAt
      age
      gender
      active
    }
  }
`;
