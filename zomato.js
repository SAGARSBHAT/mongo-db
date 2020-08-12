 var db={};

 db.users=[{
      name:'Sagar',
      role:'Admin'
 },
{
    name:'Kevin',
    role:'SuperAdmn'
}]


db.dbq={
    find:(t)=>{return `Select * from ${t}`},
    add:(t,o)=>{return `Select from ${t},name,city,Values[${o.name},${o.city}]`}
}


module.exports=db;
 