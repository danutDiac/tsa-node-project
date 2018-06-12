const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let daysOffSchema = new Schema({
    userID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        require : true
    },
    daysOff :[]
})
let DaysOff = mongoose.model('daysOff',daysOffSchema);
module.exports = DaysOff