import React, { useEffect, useState, useRef } from 'react'
import Chatboticon from './Components/Chatboticon'
import Chatform from './Components/Chatform'
import Chatmessage from './Components/Chatmessage'
import { companyInfo } from './Components/companyInfo'

const App = () => {
  const [chatHistory , setChatHistory] = useState([{
    hideInChat: true,
    role:"model",
    text:companyInfo
  },
  
]);
  const [showChatBot, setShowChatBot] = useState(false);

  const chatBodyRef = useRef();
  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
         setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role:"model", text, isError}])
    }

   history= history.map(({role, text}) => ({role, parts:[{ text }] }));
      const requestOptions =  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({contents: history}),
      };
      try{
        const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message || "Something Went Wrong")
          const apiResponeText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        updateHistory(apiResponeText);
      }
    catch(error){
      updateHistory(error.message, true);

    }
  }
  useEffect(() => {
    chatBodyRef.current.scrollTo({top : chatBodyRef.current.scrollHeight, behaviour: "smooth"});
  }, [chatHistory])

  return (
    <div className={`Container ${showChatBot ? "show-chatBot" : ""}`}>
      <button id="chatBot-toggler" onClick={() => setShowChatBot(prev => !prev)}>
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close
        </span>
      </button>
      <div className='Chatbot-popup'>
      <div className='Chat-header'>
      <div className='Header-info'>
      <Chatboticon />
        <h2 className='logo-text'>
          ChatBot
        </h2>
      </div>
      <button onClick={() => setShowChatBot(prev => !prev)} className="material-symbols-outlined">
keyboard_arrow_down
</button>
      </div>
      {/* Chat bot Body */}
      <div ref={chatBodyRef} className='chat-body'>
        <div className='message bot-msg'>
        <p className='msg-text'>Hi There <br />
        How can I help you Today.</p>
        </div>
        {chatHistory.map((chat, index) => <Chatmessage key={index} chat = {chat} />)}

      </div>
      {/* Footer */}
     
        <Chatform chatHistory = {chatHistory} setChatHistory = {setChatHistory} generateBotResponse = {generateBotResponse}/>
      </div>
    </div>
  )
}

export default App
