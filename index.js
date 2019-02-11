
const express = require('express');
const app = express();
const fetch = require("node-fetch");
const fs = require('fs');

let provincias =new Set([])


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const initialize = async() =>{
console.log("ARRANCA")
  /*Version fetch*/
   fetch('https://apis.datos.gob.ar/georef/api/provincias').then(resp=>{
   
   return resp.json()
  }).then(data=>{
data.provincias.map(item=>{
  console.log(item.nombre)
  if(provincias.has(item)){
        
  }else{
   
    provincias.add(item)
    //console.log("UNIQUE: ",item.provincia.nombre)

  }
})
    
  })
}
/*version local file
  return await fs.readFile('./geoData.json', 'utf8', function (err, data) {

    if (err) throw err;
  
    geoData = JSON.parse(data);
    geoData = geoData.datos
    geoData.map(item=>{
      
      if(provincias.has(item.provincia.nombre)){
        
      }else{
       
        provincias.add(item.provincia.nombre)
        //console.log("UNIQUE: ",item.provincia.nombre)

      }
      
    })*/
  



initialize()



















 
  /*let provs=[]
  const getProvincias = geoData.data.map((item,provs)=>{
    if(provs.findIndex(item.provincia)){
      
    }else{
      provs.push(item.provincia)
      console.log("PROVINCIA UNICA",item.provincia)
    }
  })
   
  
  //const provs = getProvincias(geoData)*/
  //console.log(geoData)

  
  

  
  

  //console.log(geoData)
  




const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017', function (err) {
 
   if (err) throw err;
 
   
 
}).then((resp)=>{console.log('connected to DB');});



app.get('/', function (req, res) {
  res.send('Welcome To Adoptar Server!');
});

app.get('/provincias',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
 
  const respJson = [...provincias]
  
  console.log(respJson)
  res.json(respJson)
})

app.listen(3008, function () {
  console.log('Runing on PORT: 3000!');
  
});
