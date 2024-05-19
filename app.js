const express = require('express')
const app =new express();
const route =require('./Routes/route')
require('./DB')
const cors =require('cors')
const path=require('path');

const morgan =require('morgan')
app.use(morgan('dev'))
app.use(express.json());
app.use(cors())
app.use('/', route)

/* this will write on at last all fronend is done then file build and paste to bakend folder and use here */
app.use(express.static(path.join(__dirname,'build'))) 


/*when we need to search localhost:2345/upload/image path we can see the imge on the page (at top on the code we will require path)*/
console.log(path.join(__dirname, 'uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/* this line of code also same after paste build file in backend and use here */
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.listen(2345 ,()=>{
    console.log('server running successfully on' +2345)
})