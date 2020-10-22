const { check } = require('express-validator')

exports.createPostValidator = [
    check('title','Title cant be empty').notEmpty(),
    check('title','Title lenght must be between 4 - 20').isLength({
        min : 4,
        max : 20
    }),
    check('body','Body cant be empty').notEmpty(),
    check('body','Body lenght must be between 4 - 20').isLength({
        min : 2,
        max : 100
    })
]