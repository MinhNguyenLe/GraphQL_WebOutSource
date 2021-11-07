import * as models from "../models";

const { UserInputError } = require("apollo-server");

const product = {
  deleteHosting: async (_, { deleteHosting: { _id } }) => {
    await models.Hosting.deleteOne({ _id });
    return models.Hosting.find();
  },
  deleteVPS: async (_, { deleteVPS: { _id } }) => {
    await models.VPS.deleteOne({ _id });
    return models.VPS.find();
  },
  deleteServer: async (_, { deleteServer: { _id } }) => {
    await models.Servers.deleteOne({ _id });
    return models.Servers.find();
  },
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
    {
      createServer: {
        name,
        support,
        information,
        SSD,
        timeSetup,
        months,
        price,
        CPU,
        HDD,
        type,
        RAM,
        bandwidth,
      },
    }
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
        name,
        support,
        information,
        SSD,
        timeSetup,
        CPU,
        HDD,
        type,
        RAM,
        bandwidth,
        idProduct: resProduct._id,
      });
      await newServer.save();

      return models.Servers.find();
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createVPS: async (
    _,
    {
      createVPS: {
        name,
        domain,
        support,
        information,
        months,
        price,
        CPU,
        cloudStorage,
        type,
        RAM,
        bandwidth,
      },
    }
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
        name,
        information,
        domain,
        support,
        CPU,
        cloudStorage,
        type,
        RAM,
        bandwidth,
        idProduct: resProduct._id,
      });
      await newVPS.save();
      return models.VPS.find();
    } catch (err) {
      console.log("Err server", err);
    }
  },
  createHosting: async (
    _,
    {
      createHosting: {
        name,
        domain,
        website,
        support,
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
        name,
        domain,
        website,
        support,
        SSDMemory,
        type,
        RAM,
        information,
        bandwidth,
        idProduct: resProduct._id,
      });
      const resHosting = await newHosting.save();
      console.log(resHosting);
      return models.Hosting.find();
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
  editHosting: async (
    _,
    {
      editHosting: {
        _id,
        name,
        domain,
        website,
        support,
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
      const hosting = await models.Hosting.findOneAndUpdate(
        { _id },
        {
          name,
          domain,
          website,
          support,
          SSDMemory,
          type,
          RAM,
          information,
          bandwidth,
        }
      ).populate("idProduct");
      const product = await models.Products.findOneAndUpdate(
        { _id: hosting.idProduct._id },
        {
          months,
          price,
        }
      );
      return models.Hosting.find();
    } catch (err) {
      console.log("Err server", err);
    }
  },
  editVPS: async (
    _,
    {
      editVPS: {
        _id,
        name,
        domain,
        CPU,
        support,
        information,
        months,
        price,
        cloudStorage,
        type,
        RAM,
        bandwidth,
      },
    }
  ) => {
    try {
      const vps = await models.VPS.findOneAndUpdate(
        { _id },
        {
          name,
          domain,
          CPU,
          support,
          cloudStorage,
          type,
          RAM,
          information,
          bandwidth,
        }
      ).populate("idProduct");
      const product = await models.Products.findOneAndUpdate(
        { _id: vps.idProduct._id },
        {
          months,
          price,
        }
      );
      return models.VPS.find();
    } catch (err) {
      console.log("Err server", err);
    }
  },
  editServer: async (
    _,
    {
      editServer: {
        _id,
        name,
        timeSetup,
        CPU,
        support,
        information,
        months,
        price,
        SSD,
        HDD,
        type,
        RAM,
        bandwidth,
      },
    }
  ) => {
    try {
      const server = await models.Servers.findOneAndUpdate(
        { _id },
        {
          name,
          timeSetup,
          CPU,
          support,
          SSD,
          HDD,
          type,
          RAM,
          information,
          bandwidth,
        }
      ).populate("idProduct");
      const product = await models.Products.findOneAndUpdate(
        { _id: server.idProduct._id },
        {
          months,
          price,
        }
      );
      return models.Servers.find();
    } catch (err) {
      console.log("Err server", err);
    }
  },
};

module.exports = product;
