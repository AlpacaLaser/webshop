# Webshop

Full-stack webshop alkalmazás Angular 21, ASP.NET 10 és MongoDB 8 technológiákkal.

## Architektúra
```
frontend/     → Angular 21 (port: 4200)
backend/      → ASP.NET 10 Web API (port: 5151)
mcp-server/   → Node.js MCP szerver (port: 3000)
mongodb        → MongoDB 8 (port: 27017)
```

## Előkövetelmények

### Docker Compose telepítéshez (egyszerűbb)
| Eszköz | Letöltés | Leírás |
|--------|----------|--------|
| Docker Desktop | [letöltés](https://www.docker.com/products/docker-desktop/) | Konténerek futtatásához |
| Git | [letöltés](https://git-scm.com/downloads) | Verziókezelés |

### Fejlesztői környezethez (Dev Container)
| Eszköz | Letöltés | Leírás |
|--------|----------|--------|
| Docker Desktop | [letöltés](https://www.docker.com/products/docker-desktop/) | Konténerek futtatásához |
| VS Code | [letöltés](https://code.visualstudio.com/) | Fejlesztői editor |
| Dev Containers extension | [letöltés](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) | VS Code-ban Dev Container támogatás |
| Git | [letöltés](https://git-scm.com/downloads) | Verziókezelés |

### Kubernetes telepítéshez (minikube)
| Eszköz | Letöltés | Leírás |
|--------|----------|--------|
| Docker Desktop | [letöltés](https://www.docker.com/products/docker-desktop/) | Konténerek futtatásához |
| Git | [letöltés](https://git-scm.com/downloads) | Verziókezelés |
| kubectl | [letöltés](https://kubernetes.io/docs/tasks/tools/) | Kubernetes CLI |
| minikube | [letöltés](https://minikube.sigs.k8s.io/docs/start/) | Helyi Kubernetes cluster |

## Az alkalmazás telepítése

### Docker Compose-zal (ajánlott)

#### 1. Repo klónozása
```bash
git clone https://github.com/AlpacaLaser/webshop.git
cd webshop
```

#### 2. Alkalmazás indítása
```bash
docker-compose up -d
```

#### 3. Megnyitás böngészőben
- Frontend: http://localhost:80
- Swagger API: http://localhost:5151/swagger

---

### Fejlesztői módban (Dev Container)

#### 1. Repo klónozása
```bash
git clone https://github.com/AlpacaLaser/webshop.git
cd webshop
```

#### 2. Dev Container indítása
- VS Code-ban: **Ctrl+Shift+P** → `Dev Containers: Reopen in Container`

#### 3. Alkalmazás indítása
```bash
# MongoDB + Backend
docker-compose up -d mongodb backend

# Frontend (új terminálban)
cd frontend
ng serve --host 0.0.0.0 --proxy-config proxy.conf.json
```

#### 4. Megnyitás böngészőben
- Frontend: http://localhost:4200
- Swagger API: http://localhost:5151/swagger

---

### Kubernetes telepítés (minikube)

#### 1. Minikube indítása
```bash
minikube start
```

#### 2. Manifestek alkalmazása
```bash
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/mcp-server.yaml
```

#### 3. Ellenőrzés
```bash
kubectl get pods
kubectl get services
```

#### 4. Alkalmazás megnyitása
```bash
minikube service frontend
```

## Funkciók

| Oldal | URL | Leírás |
|-------|-----|--------|
| Termékek | /products | Webshop termékek listája |
| Rick & Morty | /rick-and-morty | Karakterek lapozással |
| Admin | /admin | Termékek kezelése (CRUD) |

## API végpontok

| Metódus | URL | Leírás |
|---------|-----|--------|
| GET | /api/product | Összes termék |
| GET | /api/product/{id} | Egy termék |
| POST | /api/product | Új termék |
| PUT | /api/product/{id} | Termék módosítása |
| DELETE | /api/product/{id} | Termék törlése |

## MCP szerver eszközök

| Eszköz | Leírás |
|--------|--------|
| get_products | Összes termék lekérése |
| search_products | Keresés név alapján |
| get_category_stats | Kategória statisztikák |
| get_low_stock | Alacsony készlet riasztás |

## Tech stack

- **Frontend:** Angular 21, Bootstrap 5, TypeScript
- **Backend:** ASP.NET 10, C#, MongoDB Driver
- **Adatbázis:** MongoDB 8
- **MCP szerver:** Node.js, TypeScript
- **CI/CD:** GitHub Actions
- **Konténerizálás:** Docker, Docker Compose
- **Orchestráció:** Kubernetes (minikube)
