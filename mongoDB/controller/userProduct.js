import * as models from "../models";

const { UserInputError } = require("apollo-server");

const userProduct = {
  userDomain: () => {
    return new Promise((resolve, reject) => {
      models.UserDomain.find((err, userDomain) => {
        if (err) reject(err);
        else {
          resolve(userDomain);
        }
      });
    });
  },
  userProduct: async (userDomain) => {
    let userProduct = [];
    const data = await models.UserDomain.find({}).populate("idUserProduct");
    data.filter((item) => {
      if (
        item.idUserProduct._id.toString() == userDomain.idUserProduct.toString()
      ) {
        userProduct.push(item.idUserProduct);
      }
    });
    return userProduct[0];
  },
  createUserDomain: async (
    _,
    { createUserDomain: { domain, user, product, nameUrl } }
  ) => {
    try {
      const dataUser = await models.Users.findById(user);
      const dataDomain = await models.Domains.findById(domain);
      const dataProduct = await models.Products.findById(product);

      if (!dataUser) {
        throw new UserInputError("User wrong", {
          errors: {
            message: "User wrong",
          },
        });
      }
      if (!dataDomain) {
        throw new UserInputError("Domain wrong", {
          errors: {
            message: "Domain wrong",
          },
        });
      }
      if (!dataProduct) {
        throw new UserInputError("Product wrong", {
          errors: {
            message: "Product wrong",
          },
        });
      }

      const newUserProduct = new models.UserProduct({
        months: dataProduct.months,
        price: dataProduct.price,
        idUser: dataUser._id,
      });
      const resUserProduct = await newUserProduct.save();
      const newUserDomain = new models.UserDomain({
        idUserProduct: resUserProduct._id,
        dot: dataDomain.dot,
        nameUrl,
      });
      const resUserDomain = await newUserDomain.save();

      dataUser.listIdProduct.push(newUserProduct._id);
      await dataUser.save();

      console.log(resUserDomain);
      return {
        ...resUserDomain._doc,
      };
    } catch (err) {
      console.log("Err server", err);
    }
  },
};

module.exports = userProduct;
