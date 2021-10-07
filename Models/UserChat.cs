using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_React_NET_Core_Web_API_Dapper_SignalR.Models
{
    public class UserChat
    {
        public string ConnectionId { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
    }
}
