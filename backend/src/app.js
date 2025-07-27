import express from "express";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controller/socketManager.js";
import userRoutes from "./routes/user.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const PORT = process.env.PORT || 8001; // ✅ Fix PORT issue

//  Correct MongoDB Connection (Use `.env` instead of hardcoding credentials)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/apnaVideoCall";

const start = async () => {
    try {
        // ✅ Corrected MongoDB connection
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");

        // ✅ Start Server
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
};



app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use(express.json());

app.use("/api/v1/users", userRoutes); // ✅ Use user routes


start();


// import express from "express";
// import {createServer} from "node:http";
// import {Server} from "socket.io";
// import mongoose from "mongoose";
// import cors from "cors";
// // const app = express();
// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.set("port",(process.env.port || 8001))


// // server.listen(app.get("port"),(req,res)=>{
// //      console.log("listening to port 8000 ");
     
// // })


// //mongodb+srv://rv0701211:Rohit@2004@cluster0.4jkngfa.mongodb.net/

// const start = async() =>{
//     app.set("mongo_user")
//     //    const connectionDb = await mongoose.connect("mongodb://rv0701211:Rohit@2004@cluster0.4jkngfa.mongodb.net/")
//     //    console.log(`connection is success: ${connectionDb.connection.host}`);
//     // mongoose.connect('mongodb+srv://rv0701211:Rohit@2004@cluster0.mongodb.net/apnaVideoCall?retryWrites=true&w=majority', {
//     //     useNewUrlParser: true,
//     //     useUnifiedTopology: true,
//     //   });

//       mongoose.connect('mongodb://127.0.0.1:27017/apnaVideoCall', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//     server.listen(app.get("port"),(req,res)=>{
//         console.log("listening to port 8000 ");
        
//    })
// }

// app.get("/home",(req,res)=>{
//     res.send("mai aa gyaa");
// })

// start();