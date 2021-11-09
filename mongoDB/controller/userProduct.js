import { ResumeToken } from "mongodb";
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
    // await models.UserVPS.remove();
    // await models.UserServer.remove();

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
  userHosting: () => {
    return new Promise((resolve, reject) => {
      models.UserHosting.find((err, userHosting) => {
        if (err) reject(err);
        else {
          resolve(userHosting);
        }
      });
    });
  },
  userVPS: () => {
    return new Promise((resolve, reject) => {
      models.UserVPS.find((err, userVPS) => {
        if (err) reject(err);
        else {
          resolve(userVPS);
        }
      });
    });
  },
  userServer: () => {
    return new Promise((resolve, reject) => {
      models.UserServer.find((err, userServer) => {
        if (err) reject(err);
        else {
          resolve(userServer);
        }
      });
    });
  },
  userProduct: () => {
    return new Promise((resolve, reject) => {
      models.UserProduct.find((err, userProduct) => {
        if (err) reject(err);
        else {
          resolve(userProduct);
        }
      });
    });
  },
  userProductU: async (product) => {
    let user = [];
    const data = await models.UserProduct.find({}).populate("idUser");
    data.forEach((item) => {
      if (item.idUser._id.toString() == product.idUser.toString()) {
        user.push(item.idUser);
      }
    });
    return user[0];
  },
  userProductD: async (product) => {
    let userProduct = [];
    const data = await models.UserDomain.find({}).populate("idUserProduct");
    data.forEach((item) => {
      if (
        item.idUserProduct._id.toString() == product.idUserProduct.toString()
      ) {
        userProduct.push(item.idUserProduct);
      }
    });
    return userProduct[0];
  },
  userProductH: async (product) => {
    let userProduct = [];
    const data = await models.UserHosting.find({}).populate("idUserProduct");
    data.forEach((item) => {
      if (
        item.idUserProduct._id.toString() == product.idUserProduct.toString()
      ) {
        userProduct.push(item.idUserProduct);
      }
    });
    return userProduct[0];
  },
  userProductV: async (product) => {
    let userProduct = [];
    const data = await models.UserVPS.find({}).populate("idUserProduct");
    data.forEach((item) => {
      if (
        item.idUserProduct._id.toString() == product.idUserProduct.toString()
      ) {
        userProduct.push(item.idUserProduct);
      }
    });
    return userProduct[0];
  },
  userProductS: async (product) => {
    let userProduct = [];
    const data = await models.UserServer.find({}).populate("idUserProduct");
    data.forEach((item) => {
      if (
        item.idUserProduct._id.toString() == product.idUserProduct.toString()
      ) {
        userProduct.push(item.idUserProduct);
      }
    });
    return userProduct[0];
  },
  getUserDomainBuyer: async (_, { id: idBuyer }) => {
    const userDomain = await models.UserDomain.find({}).populate(
      "idUserProduct"
    );
    let result = [];
    userDomain.forEach((item) => {
      if (item.idUserProduct.idUser.toString() === idBuyer) result.push(item);
    });

    if (!result.length) {
      console.log("No Domain");
      return;
    }

    return result;
  },
  getUserHostingBuyer: async (_, { id: idBuyer }) => {
    const userHosting = await models.UserHosting.find({}).populate(
      "idUserProduct"
    );
    let result = [];
    userHosting.forEach((item) => {
      if (item.idUserProduct.idUser.toString() === idBuyer) result.push(item);
    });

    if (!result.length) {
      console.log("No Domain");
      return;
    }

    return result;
  },
  getUserVPSBuyer: async (_, { id: idBuyer }) => {
    const userVPS = await models.UserVPS.find({}).populate("idUserProduct");
    let result = [];
    userVPS.forEach((item) => {
      if (item.idUserProduct.idUser.toString() === idBuyer) result.push(item);
    });

    if (!result.length) {
      console.log("No Domain");
      return;
    }

    return result;
  },
  getUserServerBuyer: async (_, { id: idBuyer }) => {
    const userServer = await models.UserServer.find({}).populate(
      "idUserProduct"
    );
    let result = [];
    userServer.forEach((item) => {
      if (item.idUserProduct.idUser.toString() === idBuyer) result.push(item);
    });

    if (!result.length) {
      console.log("No Domain");
      return;
    }

    return result;
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
