
const {
    getAllTaksGroups,
    addNewTasksGroup,
} = require('../../models/tasksGroups.model')

async function httpGetAllTasksGroups(req, res){
    return res.status(200).json(await getAllTaksGroups());
}

async function httpAddNewTasksGroup(req, res) {

    const tasksGroup = req.body;
    if (!tasksGroup.tasksGroupsName) {
        return res.status(400).json({
            error: 'Missing required tasksGroup property',

        });
    }
  
    await addNewTasksGroup(tasksGroup);
    console.log(tasksGroup);
    return res.status(201).json(tasksGroup);
}

module.exports = {
    httpGetAllTasksGroups,
    httpAddNewTasksGroup,
};