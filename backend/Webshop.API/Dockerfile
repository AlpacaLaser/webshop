# Build stage — lefordítjuk a kódot
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Másoljuk a projekt fájlokat
COPY *.csproj .
RUN dotnet restore

# Másoljuk az összes fájlt és buildelünk
COPY . .
RUN dotnet publish -c Release -o out

# Runtime stage — csak a lefordított kód kell
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5151
ENTRYPOINT ["dotnet", "Webshop.API.dll"]
