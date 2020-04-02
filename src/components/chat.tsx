import React, { useState, useEffect, useRef, useCallback } from 'react'
import io from 'socket.io-client'

const END_POINT_URL = 'http://localhost:4001'

const Chat = () => {
  const chatList: React.MutableRefObject<string[]> = useRef([])
  const [text, setText]: [string, any] = useState('')
  
  const handleIncomingChat = useCallback((message: string) => {
    chatList.current.push(message)
    setText('')
  }, [])

  const socket: React.MutableRefObject<SocketIOClient.Socket | null> = useRef(null)
  useEffect(() => {
    socket.current = io(END_POINT_URL)
    socket.current.on('chat', handleIncomingChat)
  }, [handleIncomingChat])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    if (socket.current) {
      socket.current.emit('chat', text)
    }
  }

  return (
    <div className="chat">
      <div className="chat-list">
        {chatList.current.map((item, key) => (
          <div key={key}>
            {item}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Chat;