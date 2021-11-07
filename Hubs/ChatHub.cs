using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiftApi.Controllers;
using LiftApi.Models;
using Newtonsoft.Json;

namespace LiftApi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly ApplicationDbContext _context;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection.Room);
        }

        public async Task SendMessage(int currentFloor, int goToFloor, int idOfElevator, int floorsElevatorCanGoUpTo)
        {
            if (floorsElevatorCanGoUpTo < goToFloor || goToFloor < 1)
            {
                await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Bad floor selection", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
                return;
            }
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Opening up", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Task.Delay(2000);
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Closing", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
            if (currentFloor < goToFloor)
            {
                for (int i = currentFloor; i <= goToFloor; i++)
                {
                    await Clients.All.SendAsync("ReceiveMessage",DateTime.Now, "Going up", i, idOfElevator, floorsElevatorCanGoUpTo);
                    await Task.Delay(1000);
                }
            }
            else
            {
                for (int i = currentFloor; i >= goToFloor; i--)
                {
                    await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Going down", i, idOfElevator, floorsElevatorCanGoUpTo);
                    await Task.Delay(1000);
                }
            }
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Opening up", goToFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Task.Delay(2000);
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Closing", goToFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Waiting", goToFloor, idOfElevator, floorsElevatorCanGoUpTo);
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
