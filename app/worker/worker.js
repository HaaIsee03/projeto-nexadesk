console.log("NexaDesk Worker processando tarefas em background...");
setInterval(() => {
    console.log(`[${new Date().toISOString()}] Verificando fila de chamados...`);
}, 5000);