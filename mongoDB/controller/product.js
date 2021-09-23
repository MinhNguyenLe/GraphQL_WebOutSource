import * as models from "../models";

const { UserInputError } = require("apollo-server");

const product = {
  domains: () => {
    return new Promise((resolve, reject) => {
      models.Domains.find((err, domain) => {
        if (err) reject(err);
        else {
          resolve(domain);
        }
      });
    });
  },
  hosting: () => {
    return new Promise((resolve, reject) => {
      models.Hosting.find((err, hosting) => {
        if (err) reject(err);
        else {
          resolve(hosting);
        }
      });
    });
  },
  vps: () => {
    return new Promise((resolve, reject) => {
      models.VPS.find((err, vps) => {
        if (err) reject(err);
        else {
          resolve(vps);
        }
      });
    });
  },
  servers: () => {
    return new Promise((resolve, reject) => {
      models.Servers.find((err, server) => {
        if (err) reject(err);
        else {
          resolve(server);
        }
      });
    });
  },
  productVPS: async (vps) => {
    let products = [];
    const data = await models.VPS.find({}).populate("idProduct");

    data.filter((item) => {
      if (item.idProduct._id.toString() == vps.idProduct.toString()) {
        products.push(item.idProduct);
      }
    });
    return products[0];
  },
  productServer: async (server) => {
    let products = [];
    const data = await models.Servers.find({}).populate("idProduct");

    data.filter((item) => {
      if (item.idProduct._id.toString() == server.idProduct.toString()) {
        products.push(item.idProduct);
      }
    });
    return products[0];
  },
  productHosting: async (hosting) => {
    let products = [];
    const data = await models.Hosting.find({}).populate("idProduct");

    data.filter((item) => {
      if (item.idProduct._id.toString() == hosting.idProduct.toString()) {
        products.push(item.idProduct);
      }
    });
    return products[0];
  },
  productDomain: async (domain) => {
    let products = [];
    const data = await models.Domains.find({}).populate("idProduct");
    data.filter((item) => {
      if (item.idProduct._id.toString() == domain.idProduct.toString()) {
        products.push(item.idProduct);
      }
    });
    return products[0];
  },
  createServer: async (
    _,
    { createServer: { months, price, CPU, HDD, type, RAM, bandwidth } }
  ) => {
    try {
      const server = await models.Servers.findOne({ type });
      if (server) {
        throw new UserInputError("Type server was created", {
          errors: {
            userName: "Type server was created",
          },
        });
      }

      const newProduct = new models.Products({
        months,
        price,
      });
      const resProduct = await newProduct.save();

      const newServer = new models.Servers({
        CPU,
        HDD,
        type,
        RAM,
        bandwidth,
        idProduct: resProduct._id,
      });
      const resServer = await newServer.save();
      console.log(resServer);
      return {
        ...resServer._doc,
      };
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createVPS: async (
    _,
    { createVPS: { months, price, CPU, cloudStorage, type, RAM, bandwidth } }
  ) => {
    try {
      const vps = await models.VPS.findOne({ type });
      if (vps) {
        throw new UserInputError("Type vps was created", {
          errors: {
            userName: "Type vps was created",
          },
        });
      }

      const newProduct = new models.Products({
        months,
        price,
      });
      const resProduct = await newProduct.save();

      const newVPS = new models.VPS({
        CPU,
        cloudStorage,
        type,
        RAM,
        bandwidth,
        idProduct: resProduct._id,
      });
      const resVPS = await newVPS.save();
      console.log(resVPS);
      return {
        ...resVPS._doc,
      };
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createHosting: async (
    _,
    {
      createHosting: {
        information,
        months,
        price,
        SSDMemory,
        type,
        RAM,
        bandwidth,
      },
    }
  ) => {
    try {
      const hosting = await models.Hosting.findOne({ type });
      if (hosting) {
        throw new UserInputError("Type hosting was created", {
          errors: {
            userName: "Type hosting was created",
          },
        });
      }

      const newProduct = new models.Products({
        months,
        price,
      });
      const resProduct = await newProduct.save();

      const newHosting = new models.Hosting({
        SSDMemory,
        type,
        RAM,
        information,
        bandwidth,
        idProduct: resProduct._id,
      });
      const resHosting = await newHosting.save();
      console.log(resHosting);
      return {
        ...resHosting._doc,
      };
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createDomain: async (
    _,
    { createDomain: { price, information, images, months, dot } }
  ) => {
    try {
      const domain = await models.Domains.findOne({ dot });
      if (domain) {
        throw new UserInputError("Domain was created", {
          errors: {
            userName: "Domain was created",
          },
        });
      }

      const newProduct = new models.Products({
        months,
        price,
      });
      const resProduct = await newProduct.save();

      const newDomain = new models.Domains({
        dot,
        information,
        images: [images],
        idProduct: resProduct._id,
      });
      const resDomain = await newDomain.save();
      console.log(resDomain);
      return {
        ...resDomain._doc,
      };
    } catch (err) {
      console.log("Err server", err);
    }
  },
};

module.exports = product;
