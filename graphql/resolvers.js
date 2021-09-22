import controller from "../mongoDB/controller";

export const resolvers = {
  Query: {
    users: controller.user.users,
    buyers: controller.user.buyers,
    domains: controller.product.domains,
    hosting: controller.product.hosting,
    vps: controller.product.vps,
    servers: controller.product.servers,
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
  },
};
