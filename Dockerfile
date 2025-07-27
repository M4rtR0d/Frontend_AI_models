# Etapa 1: Build de la app con Node 22.16.0
FROM node:22.16.0-alpine AS builder

WORKDIR /app

# Copia package.json y package-lock.json primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Opcional: Verifica archivos copiados
RUN ls -l && echo "Archivos copiados correctamente"

# Opcional: Verifica la versión de Node y npm
RUN node -v && npm -v

# Compila TypeScript y construye la app Vite
RUN npm run build

# Verifica que la carpeta dist se haya generado
RUN ls -l dist && echo "Build exitoso"

# Etapa 2: Servir estáticos con nginx
FROM nginx:alpine

# Copia los archivos estáticos generados al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: Verifica archivos copiados en nginx
RUN ls -l /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]