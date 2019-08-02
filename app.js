var http = require("http"),
  fs = require("fs"),
  // NUNCA use uma função de sincronização, exceto na inicialização!
  index = fs.readFileSync(__dirname + "/index.html");

// Enviar index.html para todos os pedidos
var app = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

// Servidor socket.io ouve nosso aplicativo
var io = require("socket.io").listen(app);

// Envie a hora atual para todos os clientes conectados
function sendTime() {
  io.emit("hora", { time: new Date().toJSON() });
}

// Envie a hora atual a cada 10 segundos
setInterval(sendTime, 10000);

// Emitir mensagem de boas vindas na conexão
io.on("connection", function(socket) {
  // Use o soquete para se comunicar apenas com este cliente em particular, enviando-o ao seu próprio ID
  socket.emit("Bem-Vindo", { message: "Bem Vindo!", id: socket.id });

  socket.on("cliente", console.log);
});

app.listen(3000);
