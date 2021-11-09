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
    userHosting: controller.userProduct.userHosting,
    userVPS: controller.userProduct.userVPS,
    userServer: controller.userProduct.userServer,
    userProduct: controller.userProduct.userProduct,
  },
  UserProduct: {
    user: async (product) => {
      return controller.userProduct.userProductU(product);
    },
  },
  UserDomain: {
    userProduct: async (product) => {
      return controller.userProduct.userProductD(product);
    },
  },
  UserHosting: {
    userProduct: async (product) => {
      return controller.userProduct.userProductH(product);
    },
  },
  UserVPS: {
    userProduct: async (product) => {
      return controller.userProduct.userProductV(product);
    },
  },
  UserServer: {
    userProduct: async (product) => {
      return controller.userProduct.userProductS(product);
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
  Users: {
    listIdProduct: async (user) => {
      return controller.user.listIdProduct(user);
    },
    buyer: async (user) => {
      return controller.user.getBuyer(user);
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
    editVPS: controller.product.editVPS,
    deleteVPS: controller.product.deleteVPS,
    editServer: controller.product.editServer,
    deleteServer: controller.product.deleteServer,
    testToken: controller.user.testToken,
    cleanAllDB: controller.userProduct.cleanAllDB,
    getUserDomainBuyer: controller.userProduct.getUserDomainBuyer,
    getUserHostingBuyer: controller.userProduct.getUserHostingBuyer,
    getUserVPSBuyer: controller.userProduct.getUserVPSBuyer,
    getUserServerBuyer: controller.userProduct.getUserServerBuyer,
  },
};
