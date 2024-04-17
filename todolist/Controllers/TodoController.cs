using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolist.DAL;
using todolist.Models.DbEntities;

namespace todolist.Controllers
{
    public class TodoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TodoController(ApplicationDbContext context)
            => _context = context;

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetTodos()
        {
            var todos = await _context.Todos
                .OrderBy(x => x.IsComplete)
                .ThenBy(x => x.Description)
                .AsNoTracking().ToListAsync();

            return Json(todos);
        }

        [HttpPost]
        public async Task<JsonResult> Insert(Todo model)
        {
            if(!ModelState.IsValid)
                return Json("Model validation failed");

            await _context.Todos.AddAsync(model);
            await _context.SaveChangesAsync();
            return Json("Todo saved");
        }

        [HttpGet]
        public async Task<JsonResult> GetById(int id)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(x => x.Id == id);
            return Json(todo);
        }

        [HttpPost]
        public async Task<JsonResult> Update(Todo model)
        {
            if(!ModelState.IsValid)
                return Json("Model validation failed");

            _context.Todos.Update(model);
            await _context.SaveChangesAsync();

            return Json("Todo updated");
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(x => x.Id == id);
            if(todo == null)
                return Json($"Error on deleting item. Id {id} not found");

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return Json("Todo successfully deleted");
        }

        //[HttpGet]
        //public async Task<JsonResult> Edit(int id)
        //{
        //    var todo = await _context.Todos.FirstOrDefaultAsync(x => x.Id == id);
        //    return Json(todo);
        //}
    }
}
