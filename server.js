const express =require('express');
const app = express();
// const methodOverride = require('method-override');
// const controllers = require('./controllers');

const PORT = 5000;


// app.set('view engine', 'ejs');
// // middleware
// app.use(express.static('puplic'));
app.use(express.urlencoded({extended: false}));
// app.use(methodOverride('_method'))
// app.use('/songs', controllers.song);

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.get('/', (req, res)=>{
    res.send('hello world');
});
app.post('/songs/', (req, res) => { 
	res.send('hi');
});

app.get('/songs', (req, res) => {
    // const allSongs = songs.find();
    // Song.find({}, (error, foundSong) => {
    //     if(error) return console.log(error);

    //     console.log(foundSong)
    //     context = {songs: foundSong
    //     }
        res.render('index.ejs');
        
   
});
app.get('/songs/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/songs', (req, res) =>{
    songs.create(req.body, (error, createdSong) =>{
        if(error) return console.log(error);
         console.log(createdSong);
        res.redirect('/songs');
    })
})

app.get('/:songId', (req, res) => {
    
    songs.findById(req.params.musicId, (error, foundSong) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
       
        res.render('show.ejs');
    });
    
});


app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`));