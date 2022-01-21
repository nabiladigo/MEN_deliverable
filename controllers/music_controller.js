const express = require('express');
const router = express.Router();
const { Music } = require('../models')

Music.deleteMany({}, (error, deletedMusic) => {
    if(error) console.log(error);
    Music.insertMany(
        [
            {
                song:"Hello",
                singer:"Beyonce",
                image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Beyonce_-_Halo.png",
                date: "2014"
            },
            {
                song:"Bad Habits",
                singer:"Ed Sheeran",
                image: "https://img.youtube.com/vi/orJSJGHjBLI/hqdefault.jpg",
                date: "2021"
            },
            {
                song:"J'en ai marre",
                singer:"Najat Aatabou-نجاة اعتابو",
                image: "https://static.infofamouspeople.com/avatar/bn3fp1r2a2a8t90v86t0_faces_aatabou-najat-image.jpg",
                date: "2021"
            },
            {
                song:"Twinkle Little Star",
                singer:"Baby Lullabies",
                image: "https://i.ytimg.com/vi/-JRJibhgwUQ/maxresdefault.jpg",
                date: "2021"
            },
            // {
                // song:"Bad Habits",
                // singer:"Ed Sheeran",
                // image: "https://img.youtube.com/vi/orJSJGHjBLI/hqdefault.jpg",
                // date: "2021"
            // },
        ],
          function (error, createdMusic) {
            if (error) {
              return console.log(error);
            }
            console.log("=== Seed Complete ===");
            console.log(createdMusic);
          }
    )
    console.log(deletedMusic)
}
);

router.get('/', (req, res) => {
    Music.find({}, (error, foundMusic) => {
        if(error) return console.log(error);

        console.log(foundMusic)
        context = {
            music: allMusic
        }
        res.render('index.ejs', context);
    })
});

router.post('/', (req, res) =>{
    music.create(req.body, (error, createdMusic) =>{
        if(error) return console.log(error);
         console.log(createdMusic);
        res.redirect('/music');
    })
})


router.get('/new', (req, res)=>{
    res.render('new.ejs');
});



 
module.exports = router;