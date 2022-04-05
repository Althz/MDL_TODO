const tasksDatabase = require('./tasks.mongo');
const tasksGroups = require('./tasksGroups.mongo');
const DEFAULT_TASK_NUMBER = 100;




const task = {
    taskNumber: 100,
    name: 'Kepler Exploration X',
    description: 'No comment',
    doneDate: new Date('December 27, 2030'),
    tasksGroup: 'Kepler-442 b',
    status: false,
};

//saveTask(task);

async function existsTaskWithId(taskId) {

    return await tasksDatabase.findOne({
        taskNumber: taskId,
    });
}

async function getLatestTaskNumber() {
    const latestTask = await tasksDatabase
        .findOne({})
        .sort('-taskNumber');

    if (!latestTask) {
        return DEFAULT_TASK_NUMBER;
    }
    return latestTask.taskNumber;
}

async function getAllTasks() {
    return await tasksDatabase.find({}, {
        '_id': 0, '__v': 0,
    });
}


async function saveTask(task) {

    const tasksGroup = await tasksGroups.findOne({
        taskGroupsName: task.tasksGroup,
    });

    if (!tasksGroup) {
        throw new Error('No matching tasksgroups found');
    }

    await tasksDatabase.updateOne({
        taskNumber: task.taskNumber,
    }, task, {
        upsert: true,
    });
}


async function scheduleNewTask(task) {

    const newTaskNumber = await getLatestTaskNumber() + 1;
    const newTask = Object.assign(task, {
        status: false,
        taskNumber: newTaskNumber,
    });

    await saveTask(newTask);
}


async function abortTaskById(taskId) {

    const aborted =  await tasksDatabase.updateOne({
        taskNumber: taskId,

    },{
        status: true,
    });
    //console.log(aborted);
    return aborted.ok ===1 && aborted.modifiedCount === 1;
}

module.exports = {
    existsTaskWithId,
    getAllTasks,
    scheduleNewTask,
    abortTaskById,
}