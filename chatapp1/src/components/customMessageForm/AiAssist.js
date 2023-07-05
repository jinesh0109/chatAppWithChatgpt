import React,{useEffect, useState} from 'react'
import MessageFormUI from './MessageFormUI';
import { usePostAiAssistMutation,usePostAiTextMutation } from '../../state/api';
function useDebounce(value,delay){
    const [debounceValue,setDebounceValue]=useState("");

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value);
        },delay)
        return ()=>{
            clearTimeout(handler);
        }
    },[value,delay]);
    return debounceValue;
}
function AiAssist({props,activeChat}) {
    const [message,setMessage] = useState("");
    const [attachment,setAttachment] = useState("");
    const [triggerAssist,resultAssist] = usePostAiAssistMutation();
    const [trigger] = usePostAiTextMutation();
    const [appendText,setAppendText] = useState("");
    const handleChange = (e)=>{
        setMessage(e.target.value);
    }
    const handleSubmit = async ()=>{
        const date = new Date()
        .toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const attachs = attachment ? [{blob:attachment,file:attachment.name}] : []
        const formData = {
            attachments:attachs,
            created:date,
            text:message,
            sender_username:props.username,
            activeChatId:activeChat.id
        }
        trigger(formData)
        props.onSubmit(formData);
        setMessage("");
        setAttachment("");
        setAppendText("");
    }
    const debounceValue = useDebounce(message,1000);
    useEffect(()=>{
        if(debounceValue){
            const form={ text : message};
            triggerAssist(form);
        }
    },[debounceValue]);

    const handleKeyDown = (e)=>{
        if(e.keyCode===9 || e.keyCode===13)
        {
            e.preventDefault();
            setMessage(`${message} ${appendText}`);
        }
        setAppendText("");
    }
    useEffect(()=>{
        if(resultAssist.data?.text){
            setAppendText(resultAssist.data?.text);
        }
    },[resultAssist])

    return (
        <MessageFormUI 
            message={message}
            setAttachment={setAttachment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            appendText={appendText}
            handleKeyDown={handleKeyDown}
        />
    )
}

export default AiAssist;