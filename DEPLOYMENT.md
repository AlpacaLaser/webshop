# Telepítési útmutató

## Előkövetelmények

- Docker Desktop
- kubectl
- minikube

## 1. Minikube indítása
```bash
minikube start
```

## 2. GitHub Container Registry bejelentkezés
```bash
echo "GITHUB_TOKEN" | docker login ghcr.io -u GITHUB_FELHASZNÁLÓNÉV --password-stdin
```

## 3. Kubernetes manifesztek alkalmazása
```bash
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/mcp-server.yaml
```

## 4. Telepítés ellenőrzése
```bash
# Podok státusza
kubectl get pods

# Service-ek listája
kubectl get services
```

## 5. Alkalmazás elérése
```bash
minikube service frontend
```

Ez automatikusan megnyitja a böngészőben az alkalmazást!

## 6. Leállítás
```bash
minikube stop
```
