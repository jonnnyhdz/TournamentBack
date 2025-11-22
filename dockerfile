# Usa una imagen ligera de Node.js
FROM node:20-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala solo dependencias necesarias
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa tu app
EXPOSE 4000

# Define la variable de entorno por defecto
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "server.js"]
