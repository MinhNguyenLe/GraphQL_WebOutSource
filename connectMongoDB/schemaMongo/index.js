const mongoose = require("mongoose");

const { friendSchema } = require("./friendSchema.js");
const { seriesSchema } = require("./seriesSchema.js");

const Friends = mongoose.model("Friends", friendSchema);
const Series = mongoose.model("Series", seriesSchema);

export { Friends, Series };
