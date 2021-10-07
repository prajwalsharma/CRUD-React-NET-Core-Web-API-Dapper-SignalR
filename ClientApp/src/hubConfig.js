import * as signalR from "@microsoft/signalr";

export const employeeConnection = new signalR.HubConnectionBuilder()
  .withUrl("/employeehub")
  .withAutomaticReconnect()
  .build();

export const chatConnection = new signalR.HubConnectionBuilder()
  .withUrl("/chathub")
  .build();
