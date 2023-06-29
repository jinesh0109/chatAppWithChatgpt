import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/login", async(req,res)=>{
    try {
        const {username,password} = req.body;
        const Response = await axios.get(
            "https://api.chatengine.io/users/me",
            {
                headers:{
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": password,
                }
            }
        )
        res.status(200).json({response:Response.data})
    } catch (error) {   
        console.error("error ", error.message);
        res.status(500).json({error:error.message});
    }
});
router.post("/signup", async(req,res)=>{
    try {
        const {username,password} = req.body;
        const Response = await axios.post(
            "https://api.chatengine.io/users/",
            {
                username:username,
                secret:password,
            },
            {
                headers:{ "Private-Key":process.env.PRIVATE_KEY },
            }
        )
        res.status(200).json({response:Response.data})
        const data = ["AiChat_", "AiCode_", "AiAssist_"];
        for(let i=0;i<3;i++)
        {
            const chatCreate = await axios.post(
                "https://api.chatengine.io/chats/",
                {
                    "title": `${data[i]}`,
                    "is_direct_chat": false
                },
                {
                    headers:{
                        "Project-ID": process.env.PROJECT_ID,
                        "User-Name": username,
                        "User-Secret": password,
                    }
                }
            )
            console.log("chat " + i + " data ", chatCreate.data)
            let chatId = chatCreate.data.id;
            const addBotMember = await axios.post(
                `https://api.chatengine.io/chats/${chatId}/people/`,
                {
                    "username": "Ai_Bot_Mark",
                },
                {
                    headers:{
                        "Project-ID": process.env.PROJECT_ID,
                        "User-Name": username,
                        "User-Secret": password,
                    }
                }
            )
            console.log("member added ", addBotMember.data);

        }
    } catch (error) {
        console.error("error ", error);
        res.status(500).json({error:error.message});
    }
})
export default router;