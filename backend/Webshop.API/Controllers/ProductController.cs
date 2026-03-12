using Microsoft.AspNetCore.Mvc;
using Webshop.API.Models;
using Webshop.API.Services;

namespace Webshop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;

    // A Service-t a .NET automatikusan "beinjektálja" ide
    public ProductController(ProductService productService)
    {
        _productService = productService;
    }

    // GET /api/product — összes termék
    [HttpGet]
    public async Task<List<Product>> GetAll() =>
        await _productService.GetAllAsync();

    // GET /api/product/123 — egy termék ID alapján
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(string id)
    {
        var product = await _productService.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    // POST /api/product — új termék létrehozása
    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        await _productService.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    // PUT /api/product/123 — termék módosítása
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Product product)
    {
        var existing = await _productService.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _productService.UpdateAsync(id, product);
        return NoContent();
    }

    // DELETE /api/product/123 — termék törlése
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _productService.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _productService.DeleteAsync(id);
        return NoContent();
    }
}
