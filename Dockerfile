FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY app.js .
RUN echo "Build done"
EXPOSE 3000
CMD ["node", "-e", "require('./app'); console.log('App loaded')"]
