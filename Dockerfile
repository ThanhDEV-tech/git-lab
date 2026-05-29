FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY app.js .
EXPOSE 3000
CMD ["node", "-e", "const {add,subtract}=require('./app');const http=require('http');http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({status:'ok'}))}).listen(3000,()=>console.log('App loaded'))"]
