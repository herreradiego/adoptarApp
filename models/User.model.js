const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    photo:{type:String}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);
