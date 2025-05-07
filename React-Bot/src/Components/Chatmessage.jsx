import React from 'react'
import Chatboticon from './Chatboticon'

const Chatmessage = ({chat}) => {
  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot": "user"}-message ${chat.isError ? "error" : ""}`}>
        {chat.role === "model" && <Chatboticon />}
        <p className='msg-text'>
           {chat.text}
        </p>

      </div>
    )
  )
}

export default Chatmessage
