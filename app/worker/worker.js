console.log("Worker NexaDesk iniciado...");
// Simula o processamento de uma fila de tarefas a cada 5 segundos
setInterval(() => {
    console.log(`[${new Date().toISOString()}] Processando fila de chamados...`);
}, 5000);