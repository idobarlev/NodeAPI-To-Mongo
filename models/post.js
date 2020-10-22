const mongoose = require('mongoose')

// Post defenition in MongoDB
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 20
    },
    body : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 100
    }
})

module.exports = mongoose.model('post', postSchema)