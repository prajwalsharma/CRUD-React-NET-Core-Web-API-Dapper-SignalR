using CRUD_React_NET_Core_Web_API_Dapper_SignalR.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_React_NET_Core_Web_API_Dapper_SignalR.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        // Invoked when new user comes online
        public override async Task OnConnectedAsync()
        {

            var onlineUser = new UserChat
            {
                ConnectionId = Context.ConnectionId,
                Username = Context.User.Identity.Name
            };

            UserChatHandler.onlineUsers.Add(onlineUser);

            await Clients.All.SendAsync("UserConnected", UserChatHandler.onlineUsers);

            await base.OnConnectedAsync();
        }

        // Invoked when existing user goes offline
        public override async Task OnDisconnectedAsync(Exception exception)
        {

            var offlineUser = new UserChat
            {
                ConnectionId = Context.ConnectionId,
                Username = Context.User.Identity.Name
            };

            UserChatHandler.onlineUsers.RemoveAll(x => x.ConnectionId == offlineUser.ConnectionId && x.Username == offlineUser.Username);

            await Clients.All.SendAsync("UserConnected", UserChatHandler.onlineUsers);

            await base.OnDisconnectedAsync(exception);
        }

        // Get list of online users
        public async Task GetOnlineUsers()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("GetOnlineUsersClient", UserChatHandler.onlineUsers);
        }
    }

    public static class UserChatHandler
    {
        public static List<UserChat> onlineUsers = new List<UserChat>();
    }
}
