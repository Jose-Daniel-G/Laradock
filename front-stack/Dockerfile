# --- Etapa 1: Compilación ---
FROM node:22-alpine AS build
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos los paquetes de node_modules
RUN npm install

# Copiamos el resto del código del frontend
COPY . .

# Compilamos la aplicación para producción
RUN npm run build -- --configuration=production

# --- Etapa 2: Servidor de Producción ---
FROM nginx:alpine

# Copiamos la configuración personalizada de Nginx para Angular
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados desde la etapa anterior al directorio de Nginx
# NOTA: Asegúrate de que la ruta final coincida con el nombre de tu proyecto en angular.json (ej: dist/tu-nombre-proyecto/browser)
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Exponemos el puerto 80 para el navegador
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]