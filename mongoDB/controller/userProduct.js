import { Mongoose } from "mongoose";
import * as models from "../models";

const { UserInputError } = require("apollo-server");

const userProduct = {
  cleanAllDB: async (_, { token: { token } }) => {
    // await models.Users.remove();
    // await models.Buyers.remove();
    // await models.Domains.remove();
    // await models.Hosting.remove();
    // await models.VPS.remove();
    // await models.Servers.remove();
    // await models.Products.remove();
    // await models.UserProduct.remove();
    // await models.UserDomain.remove();
    // await models.UserHosting.remove();

    return {
      mess: "clear all DB successful",
    };
  },
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
  buyAllProduct: async (
    _,
    { user: user, domain: domain, hosting: hosting }
  ) => {
    try {
      // if (!domain || !user || !hosting) console.log("No input");
      const userData = await models.Users.findById(user);
      // let inputDomain = [],
      //   inputHosting = [];

      if (!userData) {
        throw new UserInputError("User wrong", {
          errors: {
            message: "User wrong",
          },
        });
      }
      for (const item of domain) {
        const itemX = await models.Domains.findById(item.domain).populate(
          "idProduct"
        );

        const newUserProduct = new models.UserProduct({
          months: itemX.idProduct.months,
          price: itemX.idProduct.price,
          idUser: userData._id,
          type: "domain",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserDomain = new models.UserDomain({
          idUserProduct: resUserProduct._id,
          dot: itemX.dot,
          nameUrl: item.nameUrl,
        });
        await newUserDomain.save();

        userData.listIdProduct.push(newUserProduct._id);
        await userData.save();
      }

      for (const item of hosting) {
        const itemX = await models.Hosting.findById(item.hosting).populate(
          "idProduct"
        );

        const newUserProduct = new models.UserProduct({
          months: itemX.idProduct.months,
          price: itemX.idProduct.price,
          idUser: userData._id,
          type: "hosting",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserHosting = new models.UserHosting({
          idUserProduct: resUserProduct._id,
          RAM: itemX.RAM,
          type: itemX.type,
          SSDMemory: itemX.SSDMemory,
          bandwidth: itemX.bandwidth,
        });
        await newUserHosting.save();

        userData.listIdProduct.push(newUserProduct._id);
        await userData.save();
      }

      return userData;
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createUserDomain: async (
    _,
    { createUserDomain: { domain, user, product, nameUrl } }
  ) => {
    try {
      if (!domain || !user || !product || !nameUrl) console.log("No input");
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
