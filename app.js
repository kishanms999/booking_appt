const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize=require('./util/database');

const User=require('./models/User')
var cors=require('cors');

const app = express();

app.use(cors());

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const userRoutes=require('./routes/user');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
app.use('/user',userRoutes);

// app.post('/user/add-user', async (req,res,next)=>{
//     try{
//         if(!req.body.number){
//             throw new Error('Phone number is mandatory')
//         }
//     const name=req.body.name;
//     const email=req.body.email;
//     const phonenumber=req.body.number;

//     const data = await User.create({name: name, email:email, phonenumber:phonenumber});
//     res.status(201).json({newUserDetail:data});
//     } catch(err){
//         res.status(500).json({
//             error:err
//         })
//     }
// })

// app.get('/user/get-users', async (req,res,next)=>{
//     try{
//         const users=await User.findAll();
//         res.status(200).json({allUsers:users});
//     } catch(error){
//         console.log('Get user is failing',JSON.stringify(error));
//         res.status(500).json({error:error})
//     }
// })

// app.delete('/user/delete-user/:id', async (req,res,next)=>{
//     try{
//         if(req.params.id=='undefined'){
//             console.log('ID is missing');
//             return res.status(400).json({err:'ID is missing'})
//         }
//         const uId=req.params.id;
//         await User.destroy({where:{id:uId}});
//         res.sendStatus(200);
//     } catch(error){
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})