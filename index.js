const Express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const multer = require("multer");

const app = Express();
app.use (cors());

const CONNECTION_STRING = "mongodb+srv://admin:2CMjmwyFduwLP6eQ@centromedico.d55kl.mongodb.net/?retryWrites=true&w=majority&appName=centroMedico"

const DATABASENAME = "centroMedico_1";
var database;

app.listen(5038, ()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db (DATABASENAME);
        console.log("Connected to MongoDB");
    })
})

app.get("/api/centroMedico_1/GetNotes", (request,response)=>{
    database.collection("centroMedico_1collection").find({}).toArray((error,result)=>{response.send(result);
    });
})

app.post("/api/centroMedico_1/AddNotes",multer().none(),(request,response)=>{
    database.collection("centroMedico_1collection").count({},function(error,numOfDocs){
        database.collection("centroMedico_1collection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully");
    })
})