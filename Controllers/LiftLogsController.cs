using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiftApi.Models;

namespace LiftApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiftLogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LiftLogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LiftLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiftLog>>> GetLiftLog()
        {
            return await _context.LiftLog.ToListAsync();
        }

        // GET: api/LiftLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiftLog>> GetLiftLog(int id)
        {
            var liftLog = await _context.LiftLog.FindAsync(id);

            if (liftLog == null)
            {
                return NotFound();
            }

            return liftLog;
        }

        // PUT: api/LiftLogs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiftLog(int id, LiftLog liftLog)
        {
            liftLog.Id = id;

            _context.Entry(liftLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiftLogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LiftLogs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LiftLog>> PostLiftLog(LiftLog liftLog)
        {
            _context.LiftLog.Add(liftLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiftLog", new { id = liftLog.Id }, liftLog);
        }

        // DELETE: api/LiftLogs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LiftLog>> DeleteLiftLog(int id)
        {
            var liftLog = await _context.LiftLog.FindAsync(id);
            if (liftLog == null)
            {
                return NotFound();
            }

            _context.LiftLog.Remove(liftLog);
            await _context.SaveChangesAsync();

            return liftLog;
        }

        private bool LiftLogExists(int id)
        {
            return _context.LiftLog.Any(e => e.Id == id);
        }
    }
}
