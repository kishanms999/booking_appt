const User = require('../models/User');

exports.insertUser = async (req,res,next)=>{
    try{
        if(!req.body.number){
            throw new Error('Phone number is mandatory')
        }
    const name=req.body.name;
    const email=req.body.email;
    const phonenumber=req.body.number;

    const data = await User.create({name: name, email:email, phonenumber:phonenumber});
    res.status(201).json({newUserDetail:data});
    } catch(err){
        res.status(500).json({
            error:err
        })
    }
}

exports.getUsers = async (req,res,next)=>{
    try{
        const users=await User.findAll();
        res.status(200).json({allUsers:users});
    } catch(error){
        console.log('Get user is failing',JSON.stringify(error));
        res.status(500).json({error:error})
    }
}

exports.deleteUser = async (req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('ID is missing');
            return res.status(400).json({err:'ID is missing'})
        }
        const uId=req.params.id;
        await User.destroy({where:{id:uId}});
        res.sendStatus(200);
    } catch(error){
        console.log(err);
        res.status(500).json(err);
    }
}

