const router =require('express').Router();
const product =require('../DB/models/model.jsx')
const path =require("path")
const jwt =require('jsonwebtoken')
const verifytoken =require('../midleware/jwtverify')



/*LOGIN AUTHENTICATION */

router.post('/login', async(req, res)=>{
    try {
      
        let username =req.body.username
        let password =req.body.password

    if(username=='admin' && password=='password'){

        /*authentication token creation */

        const payload ={username:username, password:password}
        const secretkey ='sssdfg@hjs'
        const token =jwt.sign(payload,secretkey)
        res.status(200).send({token:token,message:"login successfully"})

        /*-------------------------------------------------------- */
        
    }else{
        res.status(404).send('login failed')
    }
    } catch (error) {
        console.log(error)
        res.status(404).send('error'+ error.message)
       
        
    }
})



   /*..CRUD OPERATION..(CREATE READ UPDATE DELETE)*/ 
      
   router.get('/products',verifytoken, async(req,res)=>{                                 /*=======>GET */
   try {
       let data = await product.find()
       console.log(req.headers["authorization"].split(' ')[2])
       res.send({data:data,message:"data get successfully"})
       
   } catch (error) {
       console.log(error)
       res.send("oops something error")
   }
  
})

    router.get('/products/:id',verifytoken,async (req,res)=>{
        try {
            let data = await product.findById(req.params.id)
            res.send({data:data,message:"data get successfully"})
        } catch (error) {
            console.log(error)
            res.send("oops something error")         
        }
    })

 /*------------------------------------------------------------------------ */
 
 router.delete('/products/:id',verifytoken, async(req,res)=>{                         /*======> DELETE */

    try {
        let {id} = req.params;
        let doesntexist = await product.findById(id);
        if(!doesntexist) throw new Error("no data found")
        let data =await product.findByIdAndDelete(id);
        res.status(200).send({data:data,message:"data deleted successfully"})
        console.log('deleted')
    } catch (error) {
        console.log(error);
        res.status(404).send('cold not deleted due to eroor'+error)
        
    }
})




   /*-------------------------------------------------------------------------------- */

             /*image uploading codes and steps */

const multer =require('multer')  
const storage =multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file,cb){
        const uniquesuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null, uniquesuffix+'-'+ file.originalname)
    }
})           
 const upload =multer({storage: storage})



 /*---------------------------------------------------------------------------------- */

router.post('/add-products',upload.single('image') ,async(req, res)=>{                             /*======>POST */
    try {
           /* image path save on db code (path need require top on the code)*/

        let value =req.body
        value.imagepath ='http//localhost:2345/'+req.file.destination +req.file.filename;     
        console.log(req.file)

 /*--------------------------------------------------------------------------------------------- */
        let new_product = new product(req.body)
        await new_product.save()
        res.status(201).send("saved successfully")

    } catch (error) {
        console.log(error)
        res.status(400).send("oops something error"+error)
    }
})

  /*------------------------------------------------------------------------------------------- */

 router.put('/product/:id',upload.single('image'),async (req,res)=>{                                  /*=========>UPDATE */

 try {
    let {id}= req.params
    let update_data =req.body
    await product.findByIdAndUpdate(id,update_data)
    console.log("data updated")
    res.status(200).send("updated successfully")   
    
 } catch (error) {
    console.log(error)
    res.status(400).send("oopss something error"+error)
 }

 } ) 

  

module.exports =router