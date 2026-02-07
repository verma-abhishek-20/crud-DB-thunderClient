import express from 'express';
const app = express();
import { contactAll } from './Models/contact.js';
import { User } from './Models/user.js';
  

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/api/contacts",(req,res)=>{
    res.send("This is Contact section.")
})

// get All contacts :->
app.get("/api/contact", async(req,res)=>{
    const contactFind=await contactAll.find();
    if(!contactFind) res.json({message:"contacts not Find",contactFind});
    else res.json({message:"Contact Find",contactFind});
});

// get Specific contacts :->
app.get("/api/contact/:id", async(req,res)=>{
    let id=req.params.id;
    let contactFind=await contactAll.findById(id);
    if(!contactFind) return res.json({message:"data not found",contactFind});
    else res.json({message:"contact find",contactFind})
});

//  ADD Contacts :->
// Taking data using Thunder Client/Postman and saved in database:-   
app.post("/api/contact/add", async(req,res)=>{
    let {name,email,phone}=req.body;   
    const contactData=await contactAll.create({
        name,
        email,
        phone,
    });
    console.log(contactData)
    res.send("Data saved in Database");
});

//  Update Contacts :->
app.put("/api/contact/:id", async(req,res)=>{
    let id = req.params.id;
    let {name,email,phone} = req.body
    let updateContact=await contactAll.findByIdAndUpdate(id,
        {
            name,
            email,
            phone,
        },{new:true}
    );
    if(!updateContact) return res.json({message:"Not Found"})
    else res.json({message:"Contact Found: ",updateContact});
});

//  DELETE Contacts :->
app.delete("/api/contact/:id", async(req,res)=>{
    let id=req.params.id;
    let deleteContact=await contactAll.findByIdAndDelete(id);

    if(!deleteContact) return res.json({message:"Contact not exist"});
    res.json({message:"Contact deleted successfully"});
})


//  User Register :->
app.post("/api/user/register", async(req,res)=>{
    let {name,email,phone,password}=req.body;
    let userData=await User.findOne({email});
    if(userData) return res.json({message:"User already Exist"})

     userData=await User.create({
        name,
        email,
        phone,
        password
    })
    res.json({message:"saved in database",userData});

});

/// User Login :->
app.post("/api/user/login", async(req,res)=>{
    let {email,password}=req.body;
    let ValidEmail=await User.findOne({email});
    if(!ValidEmail) return res.json({message:"User not Exist"});

    let validPassword= ValidEmail.password===password;
    if(!validPassword) return res.json({message:"Invalid Credentials"})
    
    res.json({message:`Welcome back ${ValidEmail.name}`});

});

app.listen(3000,()=>console.log(`app is listening at the port ${3000}`));