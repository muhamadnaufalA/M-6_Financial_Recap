import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';

export const getUsers = async(req, res) => {
    try{
        const response = await User.findAll({
            attributes: ['id', 'username', 'password']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) => {
    try{
        const response = await User.findOne({
            attributes: ['id', 'username', 'password'],
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//REGISTER
export const createUser = async(req, res) => {
    const existingUser = await User.findAll({
        where: {
          username: req.body.username,
        },
      });
    
      if (existingUser[0]) {
        // Username already exists; return an error response
        return res.status(400).json({ msg: 'Username already taken' });
      }

    const { username, password, confPassword } = req.body;
    if (password !== confPassword){
        return res.status(400).json({msg: "Password and Confirmation Password does not match"});
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    
    try{
        await User.create({
            username: username,
            password: hashPassword
        });
        res.status(201).json({msg: "Register Success"});
    } catch (error) {
        console.log(error.message);
    }
}

//LOGIN
export const loginUser = async (req,res) => {
    
    try {
        const user = await User.findAll({
            where: {
              username: req.body.username,
            },
          });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({msg:"Wrong Password"});
        }
        
        res.status(200).json({userId: user[0].id, msg:"Login Success"});
    } catch (error) {
        res.status(404).json({msg: "Username Not FOUND"});
    }
}

export const updateUser = async(req, res) => {
    try{
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}