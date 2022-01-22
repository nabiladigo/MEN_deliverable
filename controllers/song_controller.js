const express = require('express');
const router = express.Router();
const songs =require('../models/song_model');


router.get('/', (req, res) => {
  const allSongs = songs.find();
      res.render('index.ejs', {songs: allSongs});
});

router.post('/', (req, res) =>{
  songs.create(req.body, (error, createdSong) =>{
      if(error) return console.log(error);
       console.log(createdSong);
      res.redirect('/songs');
  })
})

router.get('/new', (req, res)=>{
  res.render('new.ejs');
});

router.get('/:songId', (req, res) => {
  songs.findById(req.params.songId, (error, foundSong) => {
      if (error) {
         console.log(error);
         res.status(404).render('404.ejs', {error: error});
      };
      return res.render('show.ejs', {song: foundSong});
  });
  
});

router.delete('/:songId', (req, res) => {
  songs.findByIdAndDelete( req.params.songId, (error, deletedSong) => {
      if (error){
      console.log(error);
      res.status(404).render('404.ejs', {error: error});
    }
      console.log(deletedSong);
      return res.redirect('/songs');
  });
});

router.get('/:songId/edit', (req, res)=>{
  songs.findById(req.params.songId, (error, updatedsong)=>{
      if(error){
          console.log(error);
          res.status(404).render('404.ejs', {error: error});
      }
      return res.render('edit.ejs', {song: updatedsong});
  });
});

router.put('/:songId', (req, res)=>{
  songs.findByIdAndUpdate(req.params.songId, req.body, (error, updatedSong)=>{
     if(error){
         console.log(error);
         res.status(404).render('404.ejs', {error: error});
     }
     return res.redirect('/songs');
  });
});

module.exports = router;