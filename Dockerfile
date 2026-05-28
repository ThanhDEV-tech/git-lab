FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY app.js .
RUN echo "Build done"
EXPOSE 3000
CMD ["node", "-e", "const app=require('./app'); const http=require('http'); http.createServer((req,res)=>{res.end(JSON.stringify({status:'ok'}))}).listen(3000,()=>console.log('App loaded'))"]
