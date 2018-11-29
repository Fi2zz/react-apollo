import { USERS_QUERY } from "./type";

const defaultUser = {
  name: "华安",
  gender: "男",
  id: 9527,
  avatar: null,
  active: true,
  createdAt: 1543476042773,
  updatedAt: null,
  age: 16,
  __typename: "User"
};
export const defaults = {
  users: [defaultUser]
};
let userId = defaultUser.id;
export const resolvers = {
  Mutation: {
    add(_, { name, age, gender }, { cache }) {
      const { users } = cache.readQuery({ query: USERS_QUERY });
      userId++;
      const newUser = {
        name,
        age,
        gender,
        active: true,
        id: userId,
        createdAt: Date.now(),
        updatedAt: null,
        __typename: "User",
        avatar: null
      };
      if (users.find(item => item.name === name)) {
        throw new Error("名字已被占用");
      }
      cache.writeData({
        data: {
          users: [...users, newUser]
        }
      });
      //if no need to return value , just return null
      return null;
    },
    del(_, { id }, { cache }) {
      let { users } = cache.readQuery({ query: USERS_QUERY });

      users = users.filter(user => user.id !== id);
      cache.writeData({ data: { users } });
      //if no need to return value , just return null
      return null;
    }
  }
};
