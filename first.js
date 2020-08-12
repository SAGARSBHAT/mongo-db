const x=require('express');
const y=require('mongodb');
const c=require('cors');
const p=8900;
const a=x();
const MongoClient=y.MongoClient;
const url='mongodb://localhost:27017';
let db;

a.use(c());

a.get('/restauranthome',(req,res)=>
{
   var q={}
   if(req.query.city && req.query.meals)
   {
       q={city:req.query.city,"type.mealtype":req.query.meals}
   }
   else if(req.query.city)
   {
       q={city:req.query.city}
   }
   else if(req.query.meals)
   {
       q={"type.mealtype":req.query.meals}
   }

    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})


a.get('/restaurantlist/:city/:meals',(req,res)=>
{
   var q={};
   var s={cost:1};
   if(req.params.city && req.params.meals && req.query.cuisine && req.query.hcost && req.query.lcost && req.query.sort)
   {
       q={city:req.params.city,"type.mealtype":req.params.meals,"Cuisine.cuisine":req.query.cuisine,cost:{$gt:parseInt(req.query.hcost),
    $lt:parseInt(req.query.lcost)}}
    s={cost:parseInt(req.query.sort)}
   }
   else if(req.params.city && req.params.meals && req.query.cuisine && req.query.hcost && req.query.lcost)
   {
    q={city:req.params.city,"type.mealtype":req.params.meals,"Cuisine.cuisine":req.query.cuisine,cost:{$gt:parseInt(req.query.hcost),
        $lt:parseInt(req.query.lcost)}} 
   }
  else if(req.params.city && req.params.meals &&  req.query.cuisine &&  req.query.sort )
  {
      q={city:req.params.city,"type.mealtype":req.params.meals,"Cuisine.cuisine":req.query.cuisine};
      s={cost:parseInt(req.query.sort)}
  }
 else if(req.params.city && req.params.meal &&  req.query.hcost && req.query.lcost && req.query.sort )
 {
    q={city:req.params.city,"type.mealtype":req.params.meals,cost:{$gt:parseInt(req.query.hcost),
        $lt:parseInt(req.query.lcost)}}
        s={cost:parseInt(req.query.sort)}
 }
 else if(req.params.city && req.params.meals && req.query.cuisine )
 {
     q={city:req.params.city,"type.mealtype":req.params.meals,"Cuisine.cuisine":req.query.cuisine}
 }
 else if(req.params.city && req.params.meals &&  req.query.hcost && req.query.lcost)
 {
     q={city:req.params.city,"type.mealtype":req.params.meals,cost:{$gt:parseInt(req.query.hcost),
        $lt:parseInt(req.query.lcost)}}
 }
 else if(req.params.city && req.params.meals &&  req.query.sort )
 {
     q={city:req.params.city,"type.mealtype":req.params.meals}
     s={cost:parseInt(req.query.sort)}
 }
 else{
     q={city:req.params.city,"type.mealtype":req.params.meals}
 }

    db.collection('restaurant').find(q).sort(s).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})






a.get('/restid',(req,res)=>
{
    var q={city:req.query.cityid}
    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})

a.get('/restaurants/:id',(req,res)=>
{
    console.log(req.params.id)
    var q={_id:req.params.id};
    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })

})

a.get('/restaurantdetail/:cityid',(req,res)=>
{
    var q={city:req.params.cityid}
    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})



a.get('/restaurantdetails',(req,res)=>
{
    var q={city_name:req.query.cityname}
    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result);
    })
})


a.get('/restaurantdetails1',(req,res)=>
{


    var q={city:req.query.city}
    db.collection('restaurant').find(q).toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})



a.get('/location',(req,res)=>
{
    db.collection('city').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result);
    })
})


a.get('/meals',(req,res)=>
{
    db.collection('meals').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result);

    })
})




a.get('/cuisine',(req,res)=>
{
    db.collection('cusine').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result);
    })
})


a.get('/restaurant',(req,res)=>
{
    db.collection('restaurant').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})





MongoClient.connect(url,(err,client)=>
{
    if(err) throw err;
    db=client.db('edurekainternship');
    a.listen(p,(err)=>
    {
        if(err) throw err;
        console.log(`Server running on ${p}`)
    })
})