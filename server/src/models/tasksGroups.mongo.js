const mongoose = require('mongoose');
const tasksGroupsSchema = new mongoose.Schema({

    
    tasksGroupNumber: {
        type: Number,
        required: true,

    },
    tasksGroupsName: {
        type: String,
        required: true,

    },

});

//Connects planetsSchema with the "planets" collection
module.exports =  mongoose.model('TasksGroup',tasksGroupsSchema);