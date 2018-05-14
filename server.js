const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to write to Log file');
    }
  });
  next();
})

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (textMessage) => {
  return textMessage.toUpperCase();
})

app.get('/', (req, res) => {
//  res.send("<h1>Hello Express!</h1>");
//  res.send({
//        name: 'Raj',
//        likes: ['reading',
//                'music']

  res.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to my Website'
});
  });

app.get('/about', (req, res) => {
//  res.send("About Page");
   res.render('about.hbs',{
     pageTitle: 'About Page',
   }); //renders the template from hbs view engine
  });

  app.get('/Projects', (req, res) => {
  //  res.send("About Page");
     res.render('projects.hbs',{
       pageTitle: 'Projects Page',
       welcomeMessage: 'Welcome to Projects page'
     }); //renders the template from hbs view engine
    });

  app.get('/bad', (req, res) => {
  //  res.send("<h1>Hello Express!</h1>");
    res.send({
          errorMessage: 'Unable to handle request'

    });
  })



app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
