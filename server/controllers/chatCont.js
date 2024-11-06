
const messageModel = require('../models/messageModel');
const convrsModel = require('../models/conversationModel');
const { io , getSocketUserId } = require('../scoketio/socket');


const sendMessage = async(req , res)=>{
   try{
      const senderId = req.user;
      const receiverId = req.params.id;
      const { message } = req.body;
      
      let gotConverstn = await convrsModel.findOne({
         participants : {$all : [senderId , receiverId]}
      });

      if(!gotConverstn){
        gotConverstn =  await convrsModel.create({
            participants : [ senderId , receiverId ],
        })
      }
      
      const newMsg = await messageModel({
         senderId,
         receiverId,
         message //from body
      });

      if(newMsg){
         gotConverstn.messages.push(newMsg._id);
      };

      // await gotConverstn.save();  // one at time message stores 
      // await newMsg.save();

      await Promise.all([gotConverstn.save() , newMsg.save()]);

      const socketReceivedId = await getSocketUserId(receiverId);

      if(socketReceivedId){
         io.to(socketReceivedId).emit("newMessage" , newMsg);
      }

      return res.status(201).json(newMsg);



   }catch(err){
      res.status(500).json({
         success : false,
         message : "internal error"
      })
   }
}

const getMessages = async (req,res)=>{
   try{

      const receiverId = req.params.id;
      const senderId = req.user;

      const conversation = await convrsModel.findOne({
         participants : {$all : [senderId , receiverId]}
      }).populate({
         path : 'messages'
      });
      
      if(!conversation){
         return res.status(201).json([])
      }

      const messages = conversation.messages;

      res.status(200).json({
         success : true,
         messages
      })
     

   }catch(err){
      res.status(500).json({
         success : false,
         message : "internal error"
      })
   }
}


module.exports = { sendMessage , getMessages};
