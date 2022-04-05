const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const tasksGroups = require('./tasksGroups.mongo');

const DEFAULT_TASKS_GROUP_NUMBER = 100;

const validTasksGroups = [];

function isValidTasksGroups(tasksGroup) {
  return tasksGroup['koi_disposition'] === 'CONFIRMED'
    && tasksGroup['koi_insol'] > 0.36 && tasksGroup['koi_insol'] < 1.11
    && tasksGroup['koi_prad'] < 1.6;
}

function loadTasksGroupsData() {


  return new Promise((resolve, reject) => {

    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isValidTasksGroups(data)) {
          //TODO: Replace below create with insert + update = upsert
          saveTasksGroups(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async() => {

        const countTasksGroupsFound = (await getAllTaksGroups()).length;
        console.log(`${countTasksGroupsFound} valid  tasks groups found!`);

        resolve();
      });

  });

}

async function getAllTaksGroups() {
  return await tasksGroups.find({},{
    '_id': 0, '__v': 0,
  });
}

async function saveTasksGroups(tasksGroup){
 
  try{
    await tasksGroups.updateOne({
      tasksGroupsName: tasksGroup.tasksGroupsName,
      tasksGroupNumber: tasksGroup.tasksGroupNumber,
    }, {
      tasksGroupsName: tasksGroup.tasksGroupsName,
    }, {
      upsert: true,
    });
  }catch(err){
    console.log(`Could not save tasks group ${err}`)
  }

}


// async function saveTasksGroups(tasksGroup) {

//   await tasksGroups.findOneAndUpdate({
//     tasksGroupNumber: tasksGroup.tasksGroupNumber,
//   }, tasksGroup, {
//       upsert: false,
//   });
// }

async function getLatestTasksGroupNumber() {
  const latestTasksGroup = await tasksGroups
      .findOne({})
      .sort('-tasksGroupNumber');

  if (!latestTasksGroup) {
      return DEFAULT_TASKS_GROUP_NUMBER;
  }
  return latestTasksGroup.tasksGroupNumber;
}


async function addNewTasksGroup(tasksGroup) {

  const newTasksGroupNumber = await getLatestTasksGroupNumber() + 1;
  const newTasksGroup = Object.assign(tasksGroup, {
      tasksGroupNumber: newTasksGroupNumber,
  });

  await saveTasksGroups(newTasksGroup);
}

module.exports = {
  //loadPlanetsData 
  loadTasksGroupsData,
  getAllTaksGroups,
  addNewTasksGroup,
  //getAllPlanets,
}
