const express =require('express');
const app = express();
const PORT = 5000;
const music = require('./models/music_model.js');


require('./config/db.connection.js');

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


app.get('/new', (req, res)=>{
    res.render('new.ejs');
});
app.get('/music', (req, res)=>{
    res.render('index.ejs');
});

app.post('/music', (req, res) =>{
    music.create(req.body, (error, createdMusic) =>{
        if(error) return console.log(error);

         console.log(createdMusic);
        res.redirect('/music');
    })
})

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`));