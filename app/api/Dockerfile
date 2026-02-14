FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["node", "server.js"]