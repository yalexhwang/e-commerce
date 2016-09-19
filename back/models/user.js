var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	address: {
		name: {type: String},
		line1: {type: String},
		line2: {type: String},
		city: {type: String},
		state: {type: String},
		zip: {type: Number}
	},
	plan: {
		supplyOz: {type: Number},
		delivery: {
			option1: {type: String},
			option2: {type: String}
		}
	},
	cart: {type: Array},
	history: { type: Array },
	token: { type: String },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);