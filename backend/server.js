require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/task.route');
const productRoutes = require('./routes/product.routes');


const app = express();

connectDB();

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/products', productRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server lance sur le port ${port}`))