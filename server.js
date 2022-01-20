const express =require('express');
const app = express();
const PORT = 5000;
// const music = require('./models/music.js');
app.set('view engine', 'ejs');
// middleware
app.use(express.static('puplic'));
app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/music/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/music/', (req, res) =>{
    products.create(req.body, (error, createdProduct) =>{
        if(error) return console.log(error);

         console.log(createdProduct);
         return res.redirect('/music');
    })
})

app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`));