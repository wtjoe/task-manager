const mongoose = require ('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

const User = mongoose.model ('User', {
    name: {
        type: String,
        required: true,
        trim:true
    }, 
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    age: {
        type: Number, 
        default: 0,
        validate(value)  {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true, 
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password', value)) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

const Task = mongoose.model ('Task', {
    description: {
        type: String, 
        trim: true, 
        required: true
    }, 
    completed: {
        type: Boolean, 
        required: false,
        default: false
    }
})

// const me = new User({    
//     name: 'Joe', 
//     email: 'JOE.ROBBINS@WILLOWTREEAPPS.COM',
//     password: '       foo        '

// })

const todo = new Task({    
    description: 'New task', 
    completed: true
})

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

todo.save().then(() => {
    console.log(todo)
}).catch((error) => {
    console.log('Error', error)
})