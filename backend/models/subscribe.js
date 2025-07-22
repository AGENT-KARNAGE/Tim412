const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
    },
})

const SubscribeModel = mongoose.model("Subscribe", Schema);
module.exports = SubscribeModel;