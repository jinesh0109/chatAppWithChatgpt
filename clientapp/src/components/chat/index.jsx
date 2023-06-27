import React from 'react'
import {useMultiChatLogic,MultiChatSocket, MultiChatWindow} from "react-chat-engine-advanced"
import CustomHeader from "../customHeader/index"
import StandardMessageForm from '../customMessageForm/StandardMessageForm'
import Ai from '../customMessageForm/Ai';

function Chat() {
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const username = "user2";
  const password = "1234";
  const chatProps = useMultiChatLogic(
    projectId,
    username,
    password
  );

  return (
    <div>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} 
        style={{height:"100vh"}}
        renderChatHeader={(chat)=> <CustomHeader chat={chat}/>}
        renderMessageForm={(props)=>{
          if(chatProps.chat?.title.startsWith("AiChat_"))
          {
            return <Ai props={props} activeChat={chatProps.chat}/>
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