using MongoDB.Driver;
using Webshop.API.Models;

namespace Webshop.API.Services;

public class ProductService
{
    private readonly IMongoCollection<Product> _products;

    // Constructor — itt kapcsolódunk az adatbázishoz
    public ProductService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _products = database.GetCollection<Product>("products");
    }

    // Összes termék lekérése
    public async Task<List<Product>> GetAllAsync() =>
        await _products.Find(_ => true).ToListAsync();

    // Egy termék lekérése ID alapján
    public async Task<Product?> GetByIdAsync(string id) =>
        await _products.Find(p => p.Id == id).FirstOrDefaultAsync();

    // Új termék létrehozása
    public async Task CreateAsync(Product product) =>
        await _products.InsertOneAsync(product);

    // Termék módosítása
    public async Task UpdateAsync(string id, Product product) =>
        await _products.ReplaceOneAsync(p => p.Id == id, product);

    // Termék törlése
    public async Task DeleteAsync(string id) =>
        await _products.DeleteOneAsync(p => p.Id == id);
}
