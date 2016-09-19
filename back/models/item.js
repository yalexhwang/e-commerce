var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: {type: String, required: true},
	package: {
		type: {type: String},
		qty: {type: Number}
	},
	oz: {type: Number, required: true},
	price:{type: Number, required: true},
	type: String,
	manufacturer: String,
	img: {type: Array}
}, {timestamps: true});

module.exports = mongoose.model('Items', itemSchema);