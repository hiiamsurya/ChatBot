import React, { useRef } from "react"

const Chatform = ({chatHistory,setChatHistory,generateBotResponse}) => {
    const inputRef= useRef();
    const handleForSubmit = (e) => {
         e.preventDefault();
         const userMessage = inputRef.current.value.trim();
         if(!inputRef) return;
         console.log(userMessage);
         inputRef.current.value = "";
         //update chat history with user-message
         setChatHistory((history) => [...history, {role: "user", text: userMessage} ]);
         setTimeout(() => {
            setChatHistory((history) => [...history, {role: "model", text: "Thinking..."} ])
        generateBotResponse([...chatHistory, {role: "user", text:`Using the Details provided above, please addres this query:${userMessage}`
        }])
       
        }, 600)
    }
    return(

           <div className='chat-footer'>
          <form action="#" className='chat-form' onSubmit={handleForSubmit}>
            <input ref={inputRef} type="text" className='message-input' placeholder='Message...' required />
            <button className="material-symbols-outlined">
arrow_upward
</button>
          </form>
        
      </div>
        
    )
}
export default Chatform;