const express = require('express');
const router = express.Router();
const {Song} =require('../models');

Song.deleteMany({}, (error, deletedSong) => {
    if(error) console.log(error);
    Song.insertMany(
        [
            {
                title:"Halo",
                singer:"Beyonce",
                image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2021_32/3498175/210810-beyonce-harpers-bazaar-ew-540p.jpg",
                date: "2014"
          },
          {
                title:"Bad Habits",
                singer:"Ed Sheeran",
                image: "data:image/jpeg;base64,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",
                date: "2021"
          },
          {
                title:"J'en ai marre",
                singer:"Najat Aatabou-نجاة اعتابو",
                image: "https://static.infofamouspeople.com/avatar/bn3fp1r2a2a8t90v86t0_faces_aatabou-najat-image.jpg",
                date: "2021"
          },
          {
                title:"Twinkle Little Star",
                singer:"Baby Lullabies",
                image: "https://i.ytimg.com/vi/-JRJibhgwUQ/maxresdefault.jpg",
                date: "2021"
          }
    
        ],
        function (error, createdSong) {
          if (error) {
            return console.log(error);
          }
          console.log("=== Seed Complete ===");
          console.log(createdSong);
        }
  )
  console.log(deletedSong)
});



router.get('/', (req, res) => {
  Song.find({}, (error, foundSongs) => {
    if(error) return console.log(error);

    console.log(foundSongs)
    context = {
        songs: foundSongs
    }
    res.render('index.ejs', context);
})
});

router.post('/', (req, res) =>{
  Song.create(req.body, (error, createdSong) =>{
      if(error) return console.log(error);
       console.log(createdSong);
      res.redirect('/songs');
  })
})

router.get('/new', (req, res)=>{
  res.render('new.ejs');
});

router.get('/:songId', (req, res) => {
  Song.findById(req.params.songId, (error, foundSong) => {
      if (error) {
         console.log(error);
         res.status(404).render('404.ejs', {error: error});
      };
      return res.render('show.ejs', {song: foundSong});
  });
  
});

router.delete('/:songId', (req, res) => {
  Song.findByIdAndDelete( req.params.songId, (error, deletedSong) => {
      if (error){
      console.log(error);
      res.status(404).render('404.ejs', {error: error});
    }
      console.log(deletedSong);
      return res.redirect('/songs');
  });
});

router.get('/:songId/edit', (req, res)=>{
  Song.findById(req.params.songId, (error, updatedsong)=>{
      if(error){
          console.log(error);
          res.status(404).render('404.ejs', {error: error});
      }
      return res.render('edit.ejs', {song: updatedsong});
  });
});

router.put('/:songId', (req, res)=>{
  Song.findByIdAndUpdate(req.params.songId, req.body, (error, updatedSong)=>{
     if(error){
         console.log(error);
         res.status(404).render('404.ejs', {error: error});
     }
     return res.redirect('/songs');
  });
});

module.exports = router;