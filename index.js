const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

                                          // Middleware ( para servir arquivos estáticos (como o HTML) )  
app.use(express.static(path.join(__dirname, 'public')));

                                          // Middleware para aceitar JSON no body das requisições
app.use(express.json());

                                    // Array para fazer o armazenamento das vistorias de nosssos clientes   Da "BYD"
let vistorias = [];

                                                          // Servindo o arquivo HTML na rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

                                                                          // Rota para adicionar vistorias
app.post('/api/adicionarVistoria', (req, res) => {
  const { vendedor, placa, dia, hora } = req.body;

                                                                                // Adicionando a nova vistoria
  vistorias.push({ vendedor, placa, dia, hora });
  console.log(`Vistoria adicionada: ${vendedor} - Placa: ${placa} no dia ${dia} às ${hora}h`);

  res.status(200).send({ message: 'Vistoria adicionada com sucesso!', vistorias });
});

                                                                              // Rota para resetar vistorias
app.post('/api/resetarVistorias', (req, res) => {
  vistorias = [];                                                           // Limpa a lista de vistorias
  console.log('Lista de vistorias resetada');
  res.status(200).send({ message: 'Lista de vistorias resetada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
