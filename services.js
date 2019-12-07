const express = require('express')
const mongodb = require('mongodb');
const app = express();
app.use(express.json());

//CODE TO CONNECT TO MONGODB DATABASE AND LIST DOWN ALL COLLECTIONS FROM IT
app.get('/api/FoodHubDb',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.listCollections().toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
	
});

//CODE TO READ DATA FROM COLLECTION
app.get('/api/FoodHubDb/collection',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.collection('Customer').find({}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});

//CODE TO READ DATA FROM COLLECTION WITH PARAMETERS
app.get('/api/FoodHubDb/collection/:FirstName',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		dbo.collection('Customer').find({"FirstName":(req.params.FirstName)}).toArray(function(err, result) 
		{
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});


//CODE TO INSERT DOCUMENTS INTO COLLECTIONS
app.post('/api/FoodHubDb/collection/insert',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var doc = { '_id':2045,
        'FirstName':'Sukhdeep',
        'LastName':'Singh',
        'Email':'Sukhdeep@gmail.com',
        'Password':'Sukh#0258'};
		dbo.collection('Customer').insertOne(doc,function(err, result) 
		{
			if (err) throw err;
			res.send("DATA INSERTED");
			db.close();
		});
	});
});

//CODE TO UPDATE DATA INTO COLLECTIONS
app.put('/api/FoodHubDb/collection/update',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var query = { FirstName: "Sukhdeep" };
		var newquery = { $set: {Email:'sukh1234@yahoo.com' } };
		dbo.collection('Customer').updateOne(query,newquery,function(err, result) 
		{
			if (err) throw err;
			res.send('COLLECTION CUSTOMER UPDATED');
			db.close();
		});
	});
	
});
   
//CODE TO DELETE DOCUMENT IN COLLECTION
app.delete('/api/FoodHubDb/collection/delete',(req,res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("FoodHubDb");
		var query = { FirstName: "Sukhdeep" };
		dbo.collection('Customer').deleteOne(query,function(err, result) 
		{
			if (err) throw err;
			res.send('ONE DOCUMENT DELETED');
			db.close();
		});
	});
	
});
 

  
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}..'));








