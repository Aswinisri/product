import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import connectDB from "./db.js";

const router =express.Router();
connectDB();
const app=express();
app.use(express.json());
const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const amulSchema=mongoose.Schema({
  amul:[ {
    image:{
        data:String,
        contentType: String
    },
    productname:{
        type:String,
       
        },
  price:{
         type:String,
      
     },
     quantity:{
        type:String,
     
    },
offer:{
    type:String,
}

 } ]
}
)

var Amul = mongoose.model('Amul', amulSchema);
amulSchema.plugin(Amul);
const amulbrand={
  amul:[ {
    image:{
        data:"amullassi.png",
contentType:"image/png"
    },
    productname:"Lassi",
    price:"Rs.550",
    quantity:"2L",
    offer:"30%"
},
  {
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"Butter milk",
    price:"Rs.550",
    quantity:"1L",
    offer:"30%"
},
{
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"camel milk",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"rasmalai",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
}

]
}
// connectDB();
// const app=express();
// app.use(express.json());




app.get('/api',(req,res) =>
{
    try{
        res.status(200).send(amulbrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



app.get('/api:id',(req,res)=>{
    console.log(req.params.id);
    Amul.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            amulbrand:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})


app.post('/api',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newAmul = new Amul({
               amul:req.body.amul
            })
            newAmul.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

app.put('/api:id',(req,res)=>{
    console.log(req.params.id);
    amulbrand.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            amul:req.body.amul

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_amulbrand:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete('/api:id',(req,res)=>{
        console.log(req.params.id);
        amulbrand.deleteOne({_id:req.params.id},{
            $set:{
               
                amul:req.body.amul
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_amulbrand:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete('/api',(req,res)=>{
    
          amulbrand.deleteMany({amulbrand},(err,result)=>{
            if(err) throw err
            res.send(amulbrand)
            })
        })

        // export default router;
        const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});