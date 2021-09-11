const mongoose = require("mongoose");

const { usersSchema } = require("./Users.js");

const Users = mongoose.model("Users", usersSchema);

export { Users };
