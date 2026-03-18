# Felhasználói útmutató

## Az alkalmazásról

A Webshop egy full-stack alkalmazás amely termékek kezelésére szolgál.
Az alkalmazás elérhető a `http://localhost:30080` címen.

## Oldalak

### Termékek oldal (`/products`)
Itt láthatod az összes terméket az adatbázisból.
- Minden terméknek van neve, leírása, ára, kategóriája és készlete
- A zöld badge mutatja a készletet
- A piros badge jelzi ha a termék elfogyott

### Rick & Morty oldal (`/rick-and-morty`)
Itt láthatod a Rick & Morty sorozat karaktereit.
- Lapozás az "Előző" és "Következő" gombokkal
- Zöld badge = él, piros badge = halott
- Látható a karakter faja és helyszíne

## API végpontok

Az API elérhető a `http://localhost:5151/swagger` címen.

| Végpont | Metódus | Leírás |
|---------|---------|--------|
| `/api/product` | GET | Összes termék |
| `/api/product/{id}` | GET | Egy termék |
| `/api/product` | POST | Új termék |
| `/api/product/{id}` | PUT | Termék módosítása |
| `/api/product/{id}` | DELETE | Termék törlése |

## MCP szerver eszközök

| Eszköz | Leírás |
|--------|--------|
| `get_products` | Összes termék lekérése |
| `search_products` | Keresés név alapján |
| `get_category_stats` | Kategória statisztikák |
| `get_low_stock` | Alacsony készlet riasztás |
