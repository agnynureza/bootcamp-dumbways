const express = require('express');
const app = express();
const path = require('path')
const createError = require('http-errors')
const mysql = require('mysql');
const args = process.argv.slice(2);
const port = 3000

console.log(args)

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

app.get('/types', function (req, res, next) {
    connection.query(`SELECT distinct(name) from type_tb`,(err, rows) => {
        if(err){
            console.log(err)
        }else{
            console.log('Data Heroes types received from Db');
            res.render('4types', {data : rows})
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

app.get('/edit', function (req, res, next) {
    res.render('4edit');
});

app.post('/heroes/edit', function (req, res, next) {
    let name = req.body.name
    let type = req.body.type
    let pic = req.body.picture
    let id = req.body.id
    let sqlHeroes = `UPDATE heroes_tb SET photo='${pic}', name = '${name}' WHERE id=${id}`
    let sqlDetail = `SELECT * from heroes_tb where id = ${id}`
    
    connection.query(sqlDetail,(err,row)=>{
        if (err){
            res.redirect('/')
        }else{
            console.log(row)
            let sqlType = `UPDATE type_tb SET name='${type}' WHERE id=${row[0].type_id}`
            console.log(sqlType)
            connection.query(sqlHeroes,function(err){if(err) console.log(err)})
            connection.query(sqlType,function(err){if(err) console.log(err)})
            res.redirect('/')
        }
    })
});

app.get('/delete', function (req, res, next) {
    res.render('4delete');
});

app.post('/heroes/delete', function (req, res, next) {
    let id = req.body.id
    let sql = `select * from heroes_tb where id = ${id}`
    let sqlHeroes = `delete from heroes_tb where id = ${id}`

    connection.query(sql,(err,row)=>{
        console.log(row)
        if(err){
            console.log(err)
        }else{
            let sqlType = `delete from type_tb where id=${row[0].type_id}`
            connection.query(sqlHeroes,(err)=>{console.log(err)})
            connection.query(sqlType,(err)=>{console.log(err)})
            res.redirect('/')
        } 
    })
});

app.listen(port, function (err) {
    if (err) throw err
    console.log('Server Up Capt !')
})