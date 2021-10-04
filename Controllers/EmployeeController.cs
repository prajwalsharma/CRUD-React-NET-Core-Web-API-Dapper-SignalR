using CRUD_React_NET_Core_Web_API_Dapper_SignalR.Models;
using CRUD_React_NET_Core_Web_API_Dapper_SignalR.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using CRUD_React_NET_Core_Web_API_Dapper_SignalR.Hubs;

namespace CRUD_React_NET_Core_Web_API_Dapper_SignalR.Controllers
{
    [ApiController]
    [Route("api")]
    public class EmployeeController : ControllerBase
    {

        private readonly EmployeeRepository employeeRepository;
        private readonly IHubContext<EmployeeHub> _employeeHub;

        public EmployeeController(IHubContext<EmployeeHub> employeeHub)
        {
            employeeRepository = new EmployeeRepository();
            _employeeHub = employeeHub;
        }

        [HttpPost("employee")]
        public async Task<IActionResult> CreateEmployee([FromBody] Employee employee)
        {
            employeeRepository.CreateEmployee(employee);
            var employees = employeeRepository.GetEmployees();
            await _employeeHub.Clients.All.SendAsync("FetchLatestEmployees");
            return Ok("Employee created");
        }

        [HttpGet("employees")]
        public  IActionResult GetEmployees()
        {
            var employees = employeeRepository.GetEmployees();
            return Ok(employees);
        }

        [HttpGet("employee/{id}")]
        public IActionResult GetEmployee(int id)
        {
            var employees = employeeRepository.GetEmployee(id);
            return Ok(employees);
        }

        [HttpPut("employee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee employee)
        {
            employeeRepository.UpdateEmployee(employee);
            await _employeeHub.Clients.All.SendAsync("FetchLatestEmployees");
            return Ok("Employee record updated");
        }

        [HttpDelete("employee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            employeeRepository.DeleteEmployee(id);
            var employees = employeeRepository.GetEmployees();
            await _employeeHub.Clients.All.SendAsync("FetchLatestEmployees");
            return Ok("Employee record deleted");
        }
    }
}
