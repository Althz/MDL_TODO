const {
    
    getAllTasks,
    scheduleNewTask,
    existsTaskWithId,
    abortTaskById,

   
} = require('../../models/tasks.model');


async function httpGetAllTasks(req, res) {

    return res.status(200).json(await getAllTasks());
}

async function httpAddNewTask(req, res) {

    const task = req.body;
    if (!task.name || !task.doneDate
        || !task.tasksGroup) {
        return res.status(400).json({
            error: 'Missing required task property',

        });
    }
    task.doneDate = new Date(task.doneDate);
    if (isNaN(task.doneDate)) {
        res.status(400).json({
            error: 'Invalid done task date',
        });
    }
    await scheduleNewTask(task);
    console.log(task);
    return res.status(201).json(task);
}

async function httpAbortTask(req, res) {

    const taskId = Number(req.params.id);

    const existsTask = await existsTaskWithId(taskId); 
    if (!existsTask) {
       
        return res.status(400).json({
            error: 'Task not found',
        });
    }

    const aborted = await abortTaskById(taskId);
    if(!aborted){
        return res.status(400).json({
            error: 'Task not aborted',
        });
    }


    return res.status(200).json({
        ok: true,
    })
}

module.exports = {
    httpGetAllTasks,
    httpAddNewTask,
    httpAbortTask,
}