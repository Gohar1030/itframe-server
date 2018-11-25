const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const http = require("http");



const app = express();

app.use(express.static(path.join(__dirname, 'dist')));


//connect mongodb
// app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  next();
});



const port = process.env.PORT || '5000';
app.set('port',port);
const server = http.createServer(app);
server.listen(port,() => console.log('Running'))
