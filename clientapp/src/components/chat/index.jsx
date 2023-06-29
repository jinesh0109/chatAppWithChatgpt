import React from 'react'
import {useMultiChatLogic,MultiChatSocket, MultiChatWindow, MessageList} from "react-chat-engine-advanced"
import CustomHeader from "../customHeader/index"
import StandardMessageForm from '../customMessageForm/StandardMessageForm'
import Ai from '../customMessageForm/Ai';
import AiCode from '../customMessageForm/AiCode';
import AiAssist from '../customMessageForm/AiAssist';

function Chat({user,secret}) {
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const chatProps = useMultiChatLogic(
    projectId,
    user,
    secret
  );

  return (
    <div>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} 
        style={{height:"100vh"}}
        renderChatHeader={(chat)=> <CustomHeader chat={chat}/>}
        renderMessageForm={(props)=>{
          if(chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props={props} activeChat={chatProps.chat}/>
          }
          if(chatProps.chat?.title.startsWith("AiCode_")){
            return <AiCode props={props} activeChat={chatProps.chat}/>
          }
          if(chatProps.chat?.title.startsWith("AiAssist_")){
            return <AiAssist props={props} activeChat={chatProps.chat}/>
          }
          return(
            <StandardMessageForm props={props} activeChat={chatProps.chat}/>
          )
        }}
      />
    </div>
  )
}

export default Chat