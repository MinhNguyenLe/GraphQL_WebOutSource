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
    { user: idU, domain: domain, hosting: idH, vps: idV, server: idS }
  ) => {
    try {
      const userData = await models.Users.findById(idU);

      if (!userData) {
        throw new UserInputError("User wrong", {
          errors: {
            message: "User wrong",
          },
        });
      }
      for (const i of domain) {
        const item = await models.Domains.findById(i._id).populate("idProduct");

        const newUserProduct = new models.UserProduct({
          months: item.idProduct.months,
          price: item.idProduct.price,
          idUser: idU,
          type: "domain",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserDomain = new models.UserDomain({
          idUserProduct: resUserProduct._id,
          dot: item.dot,
          nameUrl: i.nameUrl,
        });
        await newUserDomain.save();

        userData.listIdProduct.push(newUserProduct._id);
        await userData.save();
      }

      for (const i of idH) {
        const item = await models.Hosting.findById(i).populate("idProduct");

        const newUserProduct = new models.UserProduct({
          months: item.idProduct.months,
          price: item.idProduct.price,
          idUser: idU,
          type: "hosting",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserHosting = new models.UserHosting({
          idUserProduct: resUserProduct._id,
          RAM: item.RAM,
          type: item.type,
          SSDMemory: item.SSDMemory,
          bandwidth: item.bandwidth,
          website: item.website,
          name: item.name,
          support: item.support,
        });
        await newUserHosting.save();

        userData.listIdProduct.push(newUserProduct._id);
        await userData.save();
      }

      for (const i of idV) {
        const item = await models.VPS.findById(i).populate("idProduct");

        const newUserProduct = new models.UserProduct({
          months: item.idProduct.months,
          price: item.idProduct.price,
          idUser: idU,
          type: "vps",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserHosting = new models.UserVPS({
          idUserProduct: resUserProduct._id,
          RAM: item.RAM,
          type: item.type,
          cloudStorage: item.cloudStorage,
          bandwidth: item.bandwidth,
          CPU: item.CPU,
          name: item.name,
          support: item.support,
        });
        await newUserHosting.save();

        userData.listIdProduct.push(newUserProduct._id);
        await userData.save();
      }

      for (const i of idS) {
        const item = await models.Servers.findById(i).populate("idProduct");

        const newUserProduct = new models.UserProduct({
          months: item.idProduct.months,
          price: item.idProduct.price,
          idUser: idU,
          type: "server",
        });
        const resUserProduct = await newUserProduct.save();
        const newUserHosting = new models.UserServer({
          idUserProduct: resUserProduct._id,
          RAM: item.RAM,
          type: item.type,
          HDD: item.HDD,
          SSD: item.SSD,
          bandwidth: item.bandwidth,
          CPU: item.CPU,
          name: item.name,
          support: item.support,
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
