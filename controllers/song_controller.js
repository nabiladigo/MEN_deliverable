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
                image: "https://static.independent.co.uk/2021/06/25/09/ed-sheeran.jpg?width=982&height=726&auto=webp&quality=75",
                date: "2021"
          },
          {
                title:"J'en ai marre",
                singer:"Najat Aatabou-نجاة اعتابو",
                image: "https://static.infofamouspeople.com/avatar/bn3fp1r2a2a8t90v86t0_faces_aatabou-najat-image.jpg",
                date: "1993"
          },
          {
                title:"Twinkle Little Star",
                singer:"Baby Lullabies",
                image: "https://images-na.ssl-images-amazon.com/images/I/819iQYgsj3L._RI_.jpg",
                date: "2021"
          },
          {
                title:"Uptown Funk",
                singer:"Bruno Mars",
                image: "https://static.onecms.io/wp-content/uploads/sites/6/2015/08/uptown-funk.jpg",
                date: "2014"
          },
          {
                title:"Five Little Ducks",
                singer:"Nursery Rhymes",
                image: "https://images-na.ssl-images-amazon.com/images/I/71EsyrHUEvL.jpg",
                date: "2019"
          },
          {
            title:"All of Me",
            singer:"John Legend ",
            image: "https://upload.wikimedia.org/wikipedia/en/4/4f/Allofmejohnlegend.jpg",
            date: "2015"
      },
    
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