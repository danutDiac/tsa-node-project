const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let nationalDaysSchema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    days: [{
        type: String,
        required: true
    }]
 });

 let NationalDays = mongoose.model("nationalDays", nationalDaysSchema);

 module.exports = NationalDays;