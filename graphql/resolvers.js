import controller from "../mongoDB/controller";

export const resolvers = {
  Query: {
    removeDataInDB: controller.userProduct.cleanAllDB,
    users: controller.user.users,
    buyers: controller.user.buyers,
    domains: controller.product.domains,
    hosting: controller.product.hosting,
    vps: controller.product.vps,
    servers: controller.product.servers,
    userDomain: controller.userProduct.userDomain,
  },
  UserDomain: {
    userProduct: async (userDomain) => {
      return controller.userProduct.userProduct(userDomain);
    },
  },
  VPS: {
    product: async (vps) => {
      return controller.product.productVPS(vps);
    },
  },
  Servers: {
    product: async (server) => {
      return controller.product.productServer(server);
    },
  },
  Hosting: {
    product: async (hosting) => {
      return controller.product.productHosting(hosting);
    },
  },
  Domains: {
    product: async (domain) => {
      return controller.product.productDomain(domain);
    },
  },
  Buyers: {
    user: async (buyer) => {
      return controller.user.userAsBuyer(buyer);
    },
  },
  Mutation: {
    createServer: controller.product.createServer,
    createVPS: controller.product.createVPS,
    createHosting: controller.product.createHosting,
    createDomain: controller.product.createDomain,
    login: controller.user.login,
    register: controller.user.register,
    createUserDomain: controller.userProduct.createUserDomain,
    buyAllProduct: controller.userProduct.buyAllProduct,
    deleteHosting: controller.product.deleteHosting,
    editHosting: controller.product.editHosting,
  },
};
