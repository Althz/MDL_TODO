const express = require('express');
//const { httpAbortLaunch } = require('../../../../client/src/hooks/requests');

const{

    httpGetAllTasks,
    httpAddNewTask,
    httpAbortTask,

} = require('./tasks.controller');

const tasksRouter = express.Router();


tasksRouter.get('/',httpGetAllTasks);
tasksRouter.post('/',httpAddNewTask);
tasksRouter.delete('/:id',httpAbortTask)
module.exports = tasksRouter;