import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [OnlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    let chatConnection = new signalR.HubConnectionBuilder()
      .withUrl("/chathub")
      .build();

    // 1. Start the connection
    chatConnection.start().then(() => {
      console.log("Chat connection started...");
      chatConnection.invoke("GetOnlineUsers");
    });

    if (chatConnection) {
      chatConnection.on("UserConnected", (users) => {
        setOnlineUsers(users);
        console.log(users);
      });

      chatConnection.on("GetOnlineUsersClient", (onlineUsers) => {
        console.log(onlineUsers);
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
            OnlineUsers.map((user) => {
              return <li>{user.Username}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
