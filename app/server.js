/**
 * servidor do banco de dados
 */

const express = require('express');
const app = express();
const cors = require('cors');

// importando as rotas do servidor
const userRoutes = require('./routes/auth.routes');

const PORT = 3000;
// permitindo a origem do Vue
const corsOptions = { origin: "http://localhost:8080" };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', userRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
