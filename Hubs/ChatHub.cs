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
        public override async Task OnConnectedAsync()
        {
            string userName = Context.User.Identity.Name;
            await Clients.All.SendAsync("UserConnected", "Connect", userName);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userName = Context.User.Identity.Name;
            await Clients.All.SendAsync("UserConnected", "Disconnect", userName);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
