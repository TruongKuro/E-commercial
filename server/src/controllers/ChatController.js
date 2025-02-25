const Chat=require('../models/Chat');
const ChatList=require('../models/ChatList');

class ChatController {
    async listChat(req, res, next) {

        //console.log(req.body);
        try {
            ChatList.findOne({userId: req.body.userId})
            .populate('lists.to')
            .then((list)=>{
                return res.json(list);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async show(req, res, next) {
        try {
            const { from, to } = req.body;
            const chat = await Chat.find({$all: {from: from, to: to}||{to: to, from: from}});
            return res.json(chat);
        } catch (error) {
            console.log(error);
        }
    }

    async addChat(req, res, next) {
        try {
            const { from, to, message } = req.body;

            const chat= new Chat({});
            const chatList= await ChatList.findOne({userId: from});
            if(chatList!=null) {
                const index = chatList.lists.findIndex((p) => p.to == to);
                if (index > -1) {
                    chat.from=from;
                    chat.to=to;
                    if(message!=null){
                        chat.message=message;
                        chat.type='message';
                    }

                    await chat.save();
                    res.json(chat);
                    
                }else {
                    chatList.lists.push({
                        to: to,
                    });
                    await newChatList.save();
                    res.json(newChatList);
                }
            }else {
                const newChatList=new ChatList({});
                newChatList.userId=from;
                newChatList.lists.push({
                    to: to,
                })
                await newChatList.save();
                res.json(newChatList);
            }

        } catch (error) {
             console.log(error);
        }
    }

}

module.exports = new ChatController;