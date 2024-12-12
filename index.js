
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user.route');


require('dotenv').config();
require('./libs/dbConnect');

const app = express();

const path = require('path'); 
app.set('views', path.join(__dirname, 'views')); // Ensure this points to the correct views folder
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello From Node.js' });
});

app.use('/users', userRouter);


app.get('/contact', (req, res) => {
    res.render('index', { message: 'The Contact Page' });
});
app.get('/about', (req, res) => {
    res.render('index', { message: 'The About Page' });
});
app.get('*', (req, res) => {
    res.status(404).render('index', { message: 'Not Found' });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});