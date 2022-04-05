const express = require('express');

//const planetsController = require('./planets.controller');

const {
    httpGetAllTasksGroups,
    httpAddNewTasksGroup,

} = require('./tasksGroups.controller');

const tasksGroupsRouter = express.Router();

tasksGroupsRouter.get('/', httpGetAllTasksGroups);
tasksGroupsRouter.post('/',httpAddNewTasksGroup);

module.exports = tasksGroupsRouter;