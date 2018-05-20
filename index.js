const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const db = new Sequelize('project2_nodejs', 'user', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'public/views')
app.use(express.static('public'));

app.get('/add-citation', (req, res) => {
    res.render('addcitation');
});

const Citation = db.define('citations', {
        citation : { type: Sequelize.STRING},
        author : { type: Sequelize.STRING },
        like : { type: Sequelize.INTEGER, defaultValue : 0 },
        dislike : { type: Sequelize.INTEGER, defaultValue : 0 }
      });

app.get('/', (req, res) => {
    Citation
        .sync()
        .then(()=> {
          return Citation.findAll();
        })
        .then((citations) => {
            res.render('home', { citations });
        });
});


 app.post('/api/post/addcitation', (req, res) => {
     const { citation, author, like, dislike } = req.body;
     Citation
         .sync()
         .then(() => Citation.create({ citation, author, like, dislike }))
         .then(() => res.redirect('/'))
 });


app.listen(3000);
