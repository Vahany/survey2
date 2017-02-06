var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '50.62.209.77:3306',
  user     : 'survey',
  password : 'Survey#Thumbnails2016',
  database : 'survey'
});

connection.connect(function(err){
   if(err){
       console.log('Error connecting to Db');
       console.log(err);
       return;
   }
   console.log('Connection established');
 });

connection.query('SELECT * from answers', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();