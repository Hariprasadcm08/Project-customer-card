const express=  require("express")
const mongoose= require("mongoose")
const route= require("./route/route")

const app= express()

app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Anshika:anshika2003@cluster0.ajpkc5u.mongodb.net/Anshika10-DB",{
    useNewUrlParser:true
})

.then(()=>console.log("MongoDb is connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("running on " + 3000)
})