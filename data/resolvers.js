import { Users } from "../mongoDB/db";

/**
 * GraphQL Resolvers
 **/

export const resolvers = {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        Users.find((err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
  },
};
