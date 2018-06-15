let mongoose = require('mongoose');
let Schema = mongoose.Schema

let daysOffSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    daysOff: [{
        type: String
    }]
})

let DaysOff = mongoose.model("daysOff", daysOffSchema);

module.exports = DaysOff;