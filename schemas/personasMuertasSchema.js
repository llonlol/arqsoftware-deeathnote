const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personasMuertasSchema = new Schema({
    // Nombre de la persona fallecida Unico y obligatorio
    Nombre: { type: String, required: true, trim: true, unique: true},
    //Ataque al corazón es el valor por defecto
    // en caso de que no se proporcione un valor para CausaMuerte
    CausaMuerte: { type: String, required: false, trim: "Ataque al corazón", maxlength: 500 },
    //Foto unica
    Foto: { type: Buffer, required: false, trim: null, unique: false },
}, { timestamps: true });

// Definir el  modelo
const PersonasMuertas = mongoose.model('PersonasMuertas', personasMuertasSchema);

// Exportar el modelo
module.exports = PersonasMuertas;
