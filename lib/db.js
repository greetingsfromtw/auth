var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Users = new Schema({
	username:String,
	password:String
})

mongoose.model('Users',Users)
mongoose.connect('mongodb://localhost/auth')

