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
    public class LiftHub : Hub
    {
        public async Task SendMessage(int currentFloor, int goToFloor, int idOfElevator, int floorsElevatorCanGoUpTo)
        {
            try
            {
                if (floorsElevatorCanGoUpTo < goToFloor)
                {
                    await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Selected above possible floors elevator can go to", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
                    throw new ArgumentOutOfRangeException("Selected above possible floors elevator can go to");
                }
            }
            catch(NullReferenceException)
            {
                throw new NullReferenceException("Client isnt instantiated");
            }
            if (goToFloor < 1)
            {
                await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Cannot go to floor below 1st floor", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
                throw new ArgumentOutOfRangeException("Cannot go to floor below 1st floor");
            }
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Opening up", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Task.Delay(2000);
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Closing", currentFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Task.Delay(2000);
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
            await Task.Delay(2000);
            await Clients.All.SendAsync("ReceiveMessage", DateTime.Now, "Waiting", goToFloor, idOfElevator, floorsElevatorCanGoUpTo);
            await Task.Delay(1000);
        }
    }
}
