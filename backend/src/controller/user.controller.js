import bcrypt, { hash } from 'bcryptjs';
import {User} from '../models/user.model.js';
import httpStatus from 'http-status';
import crypto from 'crypto';
import { Meeting } from '../models/meeting.model.js';

const login = async(req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
   
    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)
       
        if(isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token : token });
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username or password"})
        }

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }


}




const register = async(req, res) => {
    const { name, username, password } = req.body;
    console.log("Registering user:", req.body);

    try {
        const existingUser = await User.findOne({ username});
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name:name,
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        console.log("user register success")
        res.status(httpStatus.CREATED).json({ message: "User registered successfully"})

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getUserHistory = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user._id }); // ✅ Use ObjectId here too
    res.json(meetings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Something went wrong: ${error}` });
  }
};




const addToHistory = async(req,res) =>{
  const {token,meeting_code} = req.query;
  try {
     const user = await User.findOne({token:token});
     const newMeeting = new Meeting({
        user_id : user.user_id,
        meetingCode : meeting_code
     })
     await newMeeting.save();
     res.status(httpStatus.CREATED).json({message:'Added to history'});
  } catch (error) {
    res.json(`some thing went wrong ${error}`)
  }
}


export { login, register, getUserHistory , addToHistory };