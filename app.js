const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const username = "janardanthapaliyadev";
const password = "nGWyaWmymk37Uyy7";
const cluster = "cluster0.ichg72m";
const dbname = "usersdbs";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const fruitSchema = new mongoose.Schema({
    fruitName: String,
    taste: String,
    review: String
}, {
    collection: 'fruitInfo'
  });

const Fruit = mongoose.model("fruitInfo", fruitSchema);

// const vegetableSchema = new mongoose.Schema({
//     vegName: String,
//     color: String,
//     rating: String
// });

// const Vegetable = mongoose.model("Vegetable", vegetableSchema);

const fruit = new Fruit({
    fruitName: "Apple",
    taste: "Sweet and sour",
    review: "One apple a day keeps doctor away!"
});

const fruit1 = new Fruit({
    fruitName: "Mango",
    taste: "Sweet",
    review: "Jhakkas!"
});
// function fruitAssign(fName,fTaste,fReview) {
//     this.fruitName = fName;
//     this.taste = fTaste;
//     this.review = fReview;
// }
// let orange = new fruitAssign("Orange", "Sweet and Sour", "Citric acid and vitamin");
// const frt1 = new Fruit({
//     fruitName: orange.fruitName,
//     review: orange.review
// })

//fruit1.save();
//frt1.save();

app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/index.html");
    fruit.findOne({fruitName: 'Mango'}, (err, fruitt) => {
        if(err) {
            console.log(err);
        } else {
            console.log(fruitt);
        }
    });
});

app.listen(port, (req, res) => {
    console.log("Port is running on port "+ port);
});