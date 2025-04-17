const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const PersonasMuertas = require('../schemas/personasMuertasSchema');
const multer = require('multer');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));

// Configuración de multer para manejar la subida de archivos (necesario instalar multer con 'npm install multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/", (req, res, next) => {
    res.status(200).render("registrarMuerte");
});

router.post("/", upload.single('Foto'), async (req, res, next) => {
    const { Nombre, CausaMuerte } = req.body;
    const Foto = req.file ? req.file.buffer : null;

    const payload = req.body;

    if (Nombre) {
        try {
            // Verificar si ya existe una persona con el mismo nombre
            const existingPerson = await PersonasMuertas.findOne({ Nombre: Nombre });

            if (existingPerson) {
                payload.errorMessage = "El nombre ya está registrado.";
                return res.status(200).render("registrarMuerte", payload);
            }

            // Crear el registro de la persona fallecida
            const data = {
                Nombre: Nombre.trim(),
                CausaMuerte: CausaMuerte && CausaMuerte.trim() !== "" ? CausaMuerte.trim() : "Ataque al corazón",
                Foto: Foto
            };

            await PersonasMuertas.create(data);
            return res.redirect("/");
        } catch (err) {
            console.log(err);
            payload.errorMessage = "Algo salió mal.";
            return res.status(200).render("registrarMuerte", payload);
        }
    } else {
        payload.errorMessage = "Asegúrate de que el campo 'Nombre' tenga un valor válido.";
        return res.status(200).render("registrarMuerte", payload);
    }
});

module.exports = router;