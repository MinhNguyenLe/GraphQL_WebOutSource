import * as db from "../mongoDB/db";

/**
 * GraphQL Resolvers
 **/

export const resolvers = {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        db.Users.find((err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
    admins: () => {
      return new Promise((resolve, reject) => {
        db.Admins.find((err, admins) => {
          if (err) reject(err);
          else resolve(admins);
        });
      });
    },
    test: () => "test",
  },
  // Mutation: {},
};
