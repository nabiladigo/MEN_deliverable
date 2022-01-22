const express =require('express');
const app = express();
const methodOverride = require('method-override');
const songController = require('./controllers/song_controller')
// const controllers = require('./controllers');

const PORT = 5000;


app.set('view engine', 'ejs');

app.use(express.static('puplic'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use('/songs', songController);

app.get('/', (req, res)=>{
    res.send('hello world');
});
app.get('/*', (req, res) => {
    return res.status(404).render('404', {error: req.error});
});

app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`)
);