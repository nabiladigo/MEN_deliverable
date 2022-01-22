const express =require('express');
const app = express();
// const methodOverride = require('method-override');
// const controllers = require('./controllers');
const songs= require('./models/song_model.js')
const PORT = 5000;


app.set('view engine', 'ejs');
// // middleware
app.use(express.static('puplic'));
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
    const allSongs = songs.find();
    // Song.find({}, (error, foundSong) => {
    //     if(error) return console.log(error);

    //     console.log(foundSong)
    //     context = {songs: foundSong
    //     }
        res.render('index.ejs', {songs: allSongs});
});

app.get('/songs/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/songs/', (req, res) =>{
    songs.create(req.body, (error, createdSong) =>{
        if(error) return console.log(error);

         console.log(createdSong);
        res.redirect('/songs');
    })
})

app.get('/songs/:songId', (req, res) => {
    
    songs.findById(req.params.songId, (error, foundSong) => {
        if (error) {
            console.log(error);
            req.error= error;
            next();
        }
       
        res.render('show.ejs');
    });
    
});

app.delete('/songs/:songId', (req, res) => {
    songs.findByIdAndDelete( req.params.songId, (error, deletedSong) => {
        if (error) return console.log(error);
    
        console.log(deletedSong);
        return res.redirect('/songs');
    });
});

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`));