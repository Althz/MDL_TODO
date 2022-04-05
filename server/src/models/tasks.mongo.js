const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({

    taskNumber: {
        type: Number,
        required: true,

    },
    doneDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,

    },
    tasksGroup: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        required: true,
        default: false,

    },

});

//Connects tasksSchema with the "tasks" collection
module.exports =  mongoose.model('Task',tasksSchema);