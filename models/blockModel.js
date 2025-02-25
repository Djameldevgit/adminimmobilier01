const mongoose = require('mongoose');

const UserBlockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true }, // Verifica el nombre correcto de la colección
  motivo: { type: String, default: "Sin especificar" }, // Razón del bloqueo
  content: { type: String, default: "Sin especificar" }, // Razón del bloqueo
 
  fechaBloqueo: { type: Date, default: Date.now }, // Momento en que se bloqueó
  fechaLimite: { type: Date, default: null }, // Fecha en que expira el bloqueo
  esBloqueado: { type: Boolean, default: false } // Para indicar si sigue bloqueado
}, { timestamps: true }); // `createdAt` = fecha de bloqueo

module.exports = mongoose.model('BlockUser', UserBlockSchema);

