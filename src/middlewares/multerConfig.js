const multer = require("multer");
const path = require("path");
const fs = require("fs");


// 1. Configuração de ONDE e COMO salvar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'public', 'uploads'); // ele sai de middlewares e entra em public.
        
        // Garante que a pasta existe (BO de diretório inexistente resolvido)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Gera um nome: TIMESTAMP-NOMEORIGINAL.jpg (evita sobrescrever fotos iguais)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. O middleware que você vai usar nas ROTAS
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB por foto pra não pesar seu servidor
    fileFilter: (req, file, cb) => {
        // Aceita apenas imagens
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error("Apenas imagens são permitidas!"));
    }
});

/**
 * Função auxiliar para tratar o retorno da imagem no Controller.
 * Ela apenas valida se o arquivo chegou e retorna o nome que foi salvo.
 */
async function getImagePath(reqFile) {
    if (!reqFile) {
        return "default-product.png"; // Imagem padrão caso o admin não suba nada
    }
    // Retorna apenas o nome do arquivo para salvar no Banco de Dados
    return reqFile.filename;
};

module.exports = { upload, getImagePath };