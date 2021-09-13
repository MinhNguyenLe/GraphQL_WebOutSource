const mongoose = require("mongoose");

const { userSchema } = require("./Users.js");
const { adminSchema } = require("./Users.js");
const { buyerSchema } = require("./Users.js");
const { domainSchema } = require("./Users.js");
const { hostingSchema } = require("./Users.js");
const { priceSchema } = require("./Users.js");
const { productSchema } = require("./Users.js");
const { projectSchema } = require("./Users.js");
const { promotionSchema } = require("./Users.js");
const { serverSchema } = require("./Users.js");
const { sourcecodeSchema } = require("./Users.js");
const { vpsSchema } = require("./Users.js");
const { templateSchema } = require("./Users.js");

const Users = mongoose.model("Users", userSchema);
const Admins = mongoose.model("Admins", adminSchema);
const Buyers = mongoose.model("Buyers", buyerSchema);
const Domains = mongoose.model("Domains", domainSchema);
const Hosting = mongoose.model("Hosting", hostingSchema);
const Prices = mongoose.model("Prices", priceSchema);
const Products = mongoose.model("Products", productSchema);
const Projects = mongoose.model("Projects", projectSchema);
const Promotions = mongoose.model("Promotions", promotionSchema);
const Servers = mongoose.model("Servers", serverSchema);
const SourceCode = mongoose.model("SourceCode", sourcecodeSchema);
const VPS = mongoose.model("VPS", vpsSchema);
const WebTemplate = mongoose.model("WebTemplate", templateSchema);

export {
  Users,
  Admins,
  Buyers,
  Domains,
  Hosting,
  Prices,
  Products,
  Projects,
  Promotions,
  Servers,
  SourceCode,
  VPS,
  WebTemplate,
};
