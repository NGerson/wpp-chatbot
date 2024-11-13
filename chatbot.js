// Importa as dependências necessárias
const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const path = require('path'); // Para manipulação de caminhos de arquivos

// Cria o cliente do WhatsApp
const client = new Client();

// Gera o QR Code no terminal para escanear com o WhatsApp
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Informa que o bot está pronto para ser usado
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Notificação de desconexão
client.on('disconnected', (reason) => {
    console.log('O bot foi desconectado. Motivo:', reason);
});

// Função delay para simular digitação
const delay = ms => new Promise(res => setTimeout(res, ms));

// Adiciona um comportamento quando uma mensagem é recebida
client.on('message', async msg => {
    const chat = await msg.getChat();

    // Ignora mensagens enviadas em grupos
    if (chat.isGroup) {
        return; // Sai da função se a mensagem for de um grupo
    }

    // Mensagem inicial de saudação
    if (msg.body.match(/(oi|olá|ola|bom dia|boa tarde|boa noite)/i)) {
        await delay(2000); // delay de 2 segundos
        msg.reply('Olá! Eu sou o Assistente Virtual da JJ Mix Materiais de Construção Ltda.\n\n' +
                  'Nosso horário de atendimento é de segunda a sexta, das 08:00 às 12:00 e das 13:20 às 18:00.\n' +
                  'Endereço: Av. Berlim, 240, Porto Alegre - RS\n' +
                  'Website: www.jjmix.com.br\nInstagram: jjmixpoa\n\n' + 
                  'Para continuar com nosso atendimento, por favor, digite *Menu* para conhecer as opções.'); 
    }

    // Menu de opções
    if (msg.body.toLowerCase() === 'menu') {
        await delay(2000); // delay de 2 segundos
        msg.reply('Selecione uma das opções abaixo para obter mais informações:\n' +
                  '1 - Folder de toda nossa linha de produtos\n' +
                  '2 - Linha específica de produtos\n' +
                  '3 - Promoções\n' +
                  '4 - Falar com um vendedor');
    }

    // Opção 1 - Envio do folder de produtos (PDF)
    if (msg.body.toLowerCase() === '1') {
        await delay(2000); // delay de 2 segundos
        const pdfPath = path.join(__dirname, 'folder_produtos.pdf'); // Caminho do PDF
        const media = MessageMedia.fromFilePath(pdfPath);
        msg.reply('Enviaremos o folder com toda nossa linha de produtos. Por favor, aguarde...');
        await client.sendMessage(msg.from, media);
    }

    // Opção 2 - Linha específica de produtos
    if (msg.body.toLowerCase() === '2') {
        await delay(2000); // delay de 2 segundos
        msg.reply('Por favor, informe qual linha específica de produtos você está buscando, e enviaremos mais detalhes.');
    }

    // Opção 3 - Promoções do mês (PDF)
    if (msg.body.toLowerCase() === '3') {
        await delay(2000); // delay de 2 segundos
        const pdfPath = path.join(__dirname, 'folder_promocoes.pdf'); // Caminho do PDF 
        const media = MessageMedia.fromFilePath(pdfPath);
        msg.reply('Enviaremos o folder com nossos produtos em promoção. Por favor, aguarde...'); 
        await client.sendMessage(msg.from, media); 
    }

    // Opção 4 - Contato com um vendedor
    if (msg.body.toLowerCase() === '4') {
        await delay(2000); // delay de 2 segundos
        msg.reply('Aguarde um instante que em breve um de nossos atendentes entrará em contato.'); 
    }
});

// Inicializa o cliente do WhatsApp
client.initialize();
