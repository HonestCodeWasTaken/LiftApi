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
    public class LiftsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LiftsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Lifts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lift>>> GetLifts()
        {
            return await _context.Lifts.ToListAsync();
        }

        // GET: api/Lifts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lift>> GetLift(int id)
        {
            var lift = await _context.Lifts.FindAsync(id);

            if (lift == null)
            {
                return NotFound();
            }

            return lift;
        }

        // PUT: api/Lifts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLift(int id, Lift lift)
        {
            lift.Id = id;
            _context.Entry(lift).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiftExists(id))
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

        // POST: api/Lifts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Lift>> PostLift(Lift lift)
        {
            _context.Lifts.Add(lift);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLift", new { id = lift.Id }, lift);
        }

        // DELETE: api/Lifts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lift>> DeleteLift(int id)
        {
            var lift = await _context.Lifts.FindAsync(id);
            if (lift == null)
            {
                return NotFound();
            }

            _context.Lifts.Remove(lift);
            await _context.SaveChangesAsync();

            return lift;
        }

        private bool LiftExists(int id)
        {
            return _context.Lifts.Any(e => e.Id == id);
        }
    }
}
