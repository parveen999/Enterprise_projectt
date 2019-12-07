const express = require('express')
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./html_data'))

app.get('/menu',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");	
		dbo.collection('Dessert').find({}).toArray(function(err, result)
		{
			if (err) throw err;
			// write HTML output
          var output = '<html><header><title>Display DB</title></header><body>';
          output += '<table border="1"><tr><td><b>' + 'ID' + '</b></td><td><b>' + 'NAME' + '</b></td><td><b>' + 'PRICE' + '</b></td><td><b>' + 'DESCRIPTION' + '</b></td></tr>';

          // process todo list
            result.forEach(function(results){
            output += '<tr><td>' + results._id + '</td><td>' + results.Name +  '</td><td>' + results.Price  +'</td><td>' + results.Description +'</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
		  res.send(output);
		  console.log(result);
			//res.send(JSON.stringify(result,null,2));
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION
app.post('/menu_data',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var doc = { '_id':req.body.menu_id,
        'Name':req.body.menu_name,
        'Price':req.body.menu_price,
        'Desc':req.body.menu_descs};
		dbo.collection('Dessert').insertOne(doc,function(err, result) 
		{
			if (err) throw err
			res.send("Data is inserted to menu");
			db.close();
		});
	});
});

////CODE TO UPDATE DATA INTO COLLECTIONS
// code to update document from collecttion
app.post('/update_data',(req,res) => {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
console.log("welcome yo update");

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("FoodHubDb");
var query = {'_id':req.body.menu_id};
var newquery = { $set: { 'Name': req.body.menu_name ,'Price':req.body.menu_price,'Description':req.body.menu_desc } };
dbo.collection('Dessert').updateOne(query,newquery,function(err, result)
{
if (err) throw err;
res.send('COLLECTION DESSERT UPDATED');
db.close();
});
});

});



////delete data
/ code to delete document from collection
app.post('/delete_data',(req,res) => {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("FoodHubDb");
var query = { '_id': req.body.menu_id };
dbo.collection('Dessert').deleteOne(query,function(err, result)
{
if (err) throw err;
res.send('ONE DOCUMENT DELETED');
db.close();
});
});
}); 


  
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening on port ${port}..'));















