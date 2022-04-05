const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const tasksGroupsRouter = require('./routes/tasksGroups/tasksGroups.router');
const tasksRouter = require('./routes/tasks/tasks.router');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/tasksGroups',tasksGroupsRouter);
app.use('/tasks',tasksRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;