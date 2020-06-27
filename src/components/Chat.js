import React, { useState, useEffect, useRef } from "react";

import { HubConnectionBuilder } from "@microsoft/signalr";

import { ChatWindow } from "./ChatWindow";
import { ChatInput } from "./ChatInput";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/chat")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };
    try {
      await fetch("https://localhost:5001/chat/messages", {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed ", e);
    }
  };
  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <ChatWindow chat={chat} />
    </div>
  );
};
export default Chat;
