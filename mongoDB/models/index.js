const mongoose = require("mongoose");

const { userSchema } = require("./Users.js");
const { adminSchema } = require("./Admins.js");
const { buyerSchema } = require("./Buyers.js");
const { domainSchema } = require("./Domains.js");
const { hostingSchema } = require("./Hosting.js");
const { priceSchema } = require("./Prices.js");
const { productSchema } = require("./Products.js");
const { promotionSchema } = require("./Promotions.js");
const { serverSchema } = require("./Servers.js");
const { vpsSchema } = require("./VPS.js");
const { userDomain } = require("./UserDomain.js");
const { userVPS } = require("./UserVPS.js");
const { userServer } = require("./UserServer.js");
const { userHosting } = require("./UserHosting.js");
const { userProduct } = require("./UserProduct.js");

const UserVPS = mongoose.model("UserVPS", userVPS);
const UserServer = mongoose.model("UserServer", userServer);
const UserHosting = mongoose.model("UserHosting", userHosting);
const UserDomain = mongoose.model("UserDomain", userDomain);
const UserProduct = mongoose.model("UserProduct", userProduct);

const Users = mongoose.model("Users", userSchema);
const Admins = mongoose.model("Admins", adminSchema);
const Buyers = mongoose.model("Buyers", buyerSchema);
const Domains = mongoose.model("Domains", domainSchema);
const Hosting = mongoose.model("Hosting", hostingSchema);
const Prices = mongoose.model("Prices", priceSchema);
const Products = mongoose.model("Products", productSchema);
const Promotions = mongoose.model("Promotions", promotionSchema);
const Servers = mongoose.model("Servers", serverSchema);
const VPS = mongoose.model("VPS", vpsSchema);

export {
  Users,
  Admins,
  Buyers,
  Domains,
  Hosting,
  Prices,
  Products,
  Promotions,
  Servers,
  VPS,
  UserDomain,
  UserProduct,
  UserHosting,
  UserServer,
  UserVPS,
};
