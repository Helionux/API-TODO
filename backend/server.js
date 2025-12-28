require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = reqquire('./routes/task.routes');


const app = express();

connectDB();

app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server lance sur le port ${PORT}`))