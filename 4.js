const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

//view engine setup 
app.set();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password', // mysql local password 
  database: 'dumbways'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


//CRUD
router.get('/hero/:id', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/hero', function(req, res, next) {
    res.send('respond with a resource');
});

router.put('/hero', function(req, res, next) {
    res.send('respond with a resource');
});

router.delete('/hero/:id', function(req, res, next) {
    res.send('respond with a resource');
});
  

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});