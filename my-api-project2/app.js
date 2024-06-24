const express = require('express')
const mongoose = require('mongoose')
const Song = require('./models/songModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/song', async(req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/song/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const song = await Song.findById(id);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.post('/song', async(req, res) => {
  try {
    const song = await Song.create(req.body)
    res.status(200).json(song);
  } catch (song) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

app.put('/song/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body);
    if(!song) {
      return res.status(404).json({message: 'Cannot find any song with ID ${id}'})
    }
    const updatedSong = await Song.findById(id);
    res.status(200).json(updatedSong);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

app.delete('/song/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const song = await Song.findByIdAndDelete(id)
    if(!song){
      return res.status(404).json({message: 'Cannot find any song with ID ${id}'})
    }
    res.status(200).json(Song)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

mongoose.connect('mongodb+srv://admin:jingxuan2019@jxapi.9mw97ff.mongodb.net/Node-API?retryWrites=true&w=majority&appName=JXAPI')
.then(() => {
  app.listen(3000, ()=> {
    console.log('Node API app is running on port 3000')
  })
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log(error)
})