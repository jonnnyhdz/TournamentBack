# Usa Node.js oficial y liviano
FROM node:20-alpine

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto 4000
EXPOSE 4000

# Define entorno de producción
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "server.js"]
