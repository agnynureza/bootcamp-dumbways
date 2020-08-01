const express = require('express');
const app = express();
const path = require('path')
const createError = require('http-errors')
const mysql = require('mysql');
const args = process.argv.slice(2);
const port = 3000

//view engine setup 
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


const connection = mysql.createConnection({
    host: 'localhost',
    user: args[0] || 'agnynureza', //local username
    password: args[1] || '123456', //local password 
    database: 'dumbways'
});

connection.connect((err) => {
    if (err) throw (err)
    console.log('DB Connection established !');
});



//CRUD
app.get('/', function (req, res, next) {
    res.render('4home', {
        title: "DumbWays heroes"
    })
})

app.get('/heroes', function (req, res, next) {
    let name = req.params.name
    connection.query(`SELECT hero.id, hero.name, hero.type_id, hero.photo, type.name as type
        FROM heroes_tb as hero 
        JOIN type_tb as type on hero.type_id = type.id`,(err, rows) => {
        if(err){
            console.log(err)
        }else{
            console.log('Data Heroes received from Db');
            res.render('4list', {data : rows})
        }
    });
});

app.get('/heroes/:type', function (req, res, next) {
    let type = req.params.type
    connection.query(`SELECT hero.id, hero.name, hero.type_id, hero.photo, type.name as type
        FROM heroes_tb as hero 
        JOIN type_tb as type on hero.type_id = type.id
        WHERE type.name = '${type}'`,(err, rows) => {
        if(err){
            console.log(err)
        }else{
            console.log('Data Heroes received from Db');
            res.render('4list', {data : rows})
        }
    });
});

app.get('/add', function (req, res, next) {
    res.render('4add')
});

app.post('/heroes/add', function(req,res,next){
    let name = req.body.name
    let type = req.body.type
    let pic = req.body.picture
    connection.query(`INSERT INTO type_tb (name) VALUES('${type}')`, (err,row)=>{
        if(err){
            console.log(err)
        }else{
            connection.query(`INSERT INTO heroes_tb (name, type_id, photo) VALUES ('${name}', ${row.insertId}, '${pic}')`, (err,row)=>{
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/')
                }
            })
        }
    })
  
})

// router.put('/hero', function (req, res, next) {
//     res.send('respond with a resource');
// });

// router.delete('/hero/:id', function (req, res, next) {
//     res.send('respond with a resource');
// });


app.listen(port, function (err) {
    if (err) throw err
    console.log('Server Up Capt !')
})