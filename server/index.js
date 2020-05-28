const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config()


let maxPresets = 6;


mongoose.connect(process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db"));

//BOX SHADOW START
let shadowSchema = mongoose.Schema({
    data: String,
    name: String,
    date: String
});
let shadowModel = mongoose.model('shadowModel', shadowSchema);

app.get('/api/box-shadow-data', async (req, res) => {
    let data = await shadowModel.find({});
    res.send(data);
});
app.post('/api/box-shadow-data', async (req, res) => {



    let date = req.body.saveDate === 'YES' ? new Date().toJSON().slice(0, 10).replace(/-/g, '/') : 'No date info';
    let data = new shadowModel({
        data: req.body.boxShadow,
        name: req.body.name,
        date: date
    })
    data = await data.save();
    // console.log(data);
})
//BOX SHADOW END


//BORDER RADIUS START
let borderSchema = mongoose.Schema({
    borderRadius: String,
    borderStyle: String,
    name: String,
    date: String
});
let borderModel = mongoose.model('borderModel', borderSchema);


app.get('/api/border-radius-data', async (req, res) => {
    let data = await borderModel.find({});
    res.send(data);
});
app.post('/api/border-radius-data', async (req, res) => {

    if ((await borderModel.find({})).length > maxPresets)
        await borderModel.deleteMany({});

    let date = req.body.saveDate === 'YES' ? new Date().toJSON().slice(0, 10).replace(/-/g, '/') : 'No date info';
    let data = new borderModel({
        borderRadius: req.body.borderRadius,
        borderStyle: req.body.borderStyle,
        name: req.body.name,
        date: date
    })
    data = await data.save();

})
//BORDER RADIUS END

app.listen(3000, () => console.log('Server started, port 3000'));