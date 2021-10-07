import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [OnlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    let chatConnection = new signalR.HubConnectionBuilder()
      .withUrl("/chathub")
      .build();

    // 1. Start the connection
    chatConnection.start();

    if (chatConnection) {
      chatConnection.on("UserConnected", (connectionType, username) => {
        if (connectionType === "Connect") {
          OnlineUsers.push(username);
          setOnlineUsers([...OnlineUsers]);
          console.log(OnlineUsers);
          console.log(username + " joined...");
        } else {
          const index = OnlineUsers.indexOf(username);

          if (index > -1) {
            OnlineUsers.splice(index, 1);
            setOnlineUsers([...OnlineUsers]);
            console.log(OnlineUsers);
            console.log(username + " left...");
          }
        }
      });
    }

    // 2. Clean the connection
    return () => {
      if (chatConnection) {
        chatConnection.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>Online Users</h1>
      <hr></hr>
      <div>
        <ul>
          {OnlineUsers &&
            OnlineUsers.length > 0 &&
            OnlineUsers.map((u) => {
              return <li>{u}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
