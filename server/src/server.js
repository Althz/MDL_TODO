const http = require('http');
const mongoose = require('mongoose');


const app = require('./app');

//const { loadTasksGroupsData } = require('./models/tasksGroups.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://todo-api:n0Leb8tjZAjU8VPt@todocluster.wcbvh.mongodb.net/todo?retryWrites=true&w=majority";
//const MONGO_URL = "mongodb+srv://todo-api:VAcf6FvYEYFJbW10@cluster0.dxac3.mongodb.net/todo?retryWrites=true&w=majority";
const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('MongoDb connection ready!');
});


mongoose.connection.on('error',(err)=>{
    console.error(err);
});


// useFindAndModify: false,
// useCreateIndex: true,

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //await loadTasksGroupsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });

}

startServer();
// app.listen();


