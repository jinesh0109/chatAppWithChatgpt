import React, { useState } from 'react'
import MessageFormUI from './MessageFormUI';
function StandardMessageForm({props,activeChat}) {
  const [message,setMessage] = useState("");
  const [attachment,setAttachment] = useState("");
  const handleChange = (e)=>{
    setMessage(e.target.value);
  }
  const handleSubmit = async ()=>{
    const date = new Date()
    .toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random()*1000)}+00:00`);
    const attachs = attachment ? [{blob:attachment,file:attachment.name}] : []
    const formData = {
        attachments:attachs,
        created:date,
        text:message,
        sender_username:props.username,
        activeChatId:activeChat.id
    }
    props.onSubmit(formData);
    setMessage("");
    setAttachment("");
  }
  return (
    <>
        <MessageFormUI message={message} setAttachment={setAttachment} handleChange={handleChange}
            handleSubmit={handleSubmit} />
    </>
  )
}

export default StandardMessageForm