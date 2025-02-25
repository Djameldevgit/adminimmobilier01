require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');
 
const path = require('path');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');

// Configuración de i18next
const languages = ['en', 'fr', 'ar'];
const resources = languages.reduce((acc, lang) => {
  acc[lang] = { translation: require(`./locales/${lang}.json`) };
  return acc;
}, {});

i18next.use(i18nextMiddleware.LanguageDetector).init({
    fallbackLng: 'en', // Idioma por defecto
    resources,
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));

// Configuración del servidor con Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);
io.on('connection', socket => {
  SocketServer(socket);
});

// Crear servidor Peer
 

// Rutas

app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
app.use('/api', require('./routes/languageRouter'));
app.use('/api', require('./routes/blockUserRouter'));
// Conexión a MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) throw err;
  console.log('MongoDB Djamel et connecte');
});

// Configuración para producción
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientPath));
  app.get('*', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));
}

// Iniciar servidor
const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log('djamel serveur sur le porte', port);
});
