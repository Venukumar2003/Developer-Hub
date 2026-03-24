

const express = require ("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken")

const devUser = require("./devUserModel.js")
const middleware = require("./middleware.js")
const reviewModel = require("./reviewModel.js")

const cors = require ("cors")



const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors({origin : "*"}));


mongoose.connect("mongodb://localhost:27017/developersHub")
.then(()=>{
    console.log("Mongoose connected Sucessfully")
}).catch((error)=>{
    console.log("error in mongoose connection",error)
})

// app.get("/",(req,res)=>{
//     res.send("Hello World !!")
// })

app.post("/register",async (req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,confirmPassword} = req.body;

        const exist = await devUser.findOne({email})

        if(exist){
            res.status(400).send("User is already registered");
        }else{
            res.status(201).send("user Created Successfully")
        }

        if(password !== confirmPassword){
            return res.status(403).send("Password  and confirmPassword are not matching")
        }

        let newUser = new devUser({
            fullname,email,mobile,skill,password,confirmPassword
        })

        newUser.save()
        return res.status(200).send("User registered Successfully")


    }catch(error){
        console.log(error);
        res.status(500).json({"message" : "error in register api "})

    }
})


app.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body

        const exist = await devUser.findOne({email})

        if(!exist){
            return res.status(400).send("User not exists")
        }

        if(exist.password !== password){
            return res.status(400).send("Password Invalid")
        }

        let payload = {
            user : {
                id : exist.id
            }

        }

        jwt.sign(payload,"jwtpassword",{expiresIn : 360000000},
            (err,token)=>{
                if(err) {
                    throw err
                }
                return res.json({token})
            }
        )

    }catch(error){
        console.log(error);
        res.status(500).json({"message" : "error in register api "})

    }
})



app.get("/allprofiles",middleware,async(req,res)=>{
    try{
        let allprofiles = await devUser.find()
        return res.json(allprofiles)
        
    }catch(error){
        console.log(error);
        res.status(500).json({"message" : "server Error "})

    }
})




app.get("/myprofile",middleware,async(req,res)=>{
    try{
        let user = await devUser.findById(req.user.id)
        return res.json(user);

    }catch(error){
        console.log(error);
        res.status(500).json({"message" : "Server Error "})

    }
})


app.post("/addreview",middleware,async(req,res)=>{
    try{
        const {taskworker,rating} = req.body;
        const exist = await devUser.findById(req.user.id)
        const newReview = new reviewModel({
            taskprovider : exist.fullname,
            taskworker,rating
        })
        newReview.save()
        res.status(200).send("Review updated successfully")

    }catch(error){
        console.log(error)
        return res.status(500).send("Server Error")
    }
})


app.get("/myreview",middleware,async(req,res)=>{
    try{
        let allreviews = await reviewModel.find()
        let myreviews = allreviews.filter(review => review.taskworker.toString() === req.user.toString())
        return res.status(200).json(myreviews);
    }catch(error){
        console.log(error);
        return res.status(500).send("Server Error")
    }
})



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})