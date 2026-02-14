# 📖 Runbook Técnico: Operações e Resposta a Incidentes – NexaDesk

**Curso:** Engenharia de Computação – Centro Universitário UniFECAF  
**Disciplina:** DevOps e Cultura de Confiabilidade  
**Estudante:** Isaias Bruno da Silva Júnior (HaaISee03)  
**Tutor(a):** Rafaela Silva  

---

## 1. Objetivo
Este documento estabelece os procedimentos operacionais padrão para garantir a alta disponibilidade e a resiliência da plataforma NexaDesk. Ele serve como guia para o time de SRE e Engenharia na execução de deploys e na remediação de incidentes críticos.

## 2. Checklist de Pré-Deploy (Gate de Qualidade)
Antes de qualquer alteração em ambiente de produção, os seguintes critérios devem ser validados:

* **Status do Pipeline**: Confirme se o workflow no GitHub Actions finalizou com sucesso (Check Verde).
* **Imutabilidade**: Verifique se as imagens Docker da API e do Worker foram geradas com a tag do SHA do commit.
* **Validação em Staging**: Confirme que os novos manifestos foram aplicados com sucesso no diretório `/environments/staging` sem erros de runtime.
* **Lint de Infraestrutura**: Garanta que o passo de validação estática de YAML não retornou avisos de má estruturação.

## 3. Indicadores de Confiabilidade (SLIs/SLOs)
A saúde da operação NexaDesk é medida através dos seguintes indicadores:

* **Latência (API)**: Tempo de resposta em milissegundos (Meta: 99% das requisições < 300ms).
* **Taxa de Erro**: Percentual de respostas 5xx (Meta: < 0.5%).
* **Disponibilidade (Uptime)**: Status de funcionamento dos pods (Meta: 99.9%).
* **Throughput (Worker)**: Taxa de processamento de mensagens em background.

## 4. Plano de Resposta a Incidentes

### Cenário A: Instabilidade Imediata Pós-Release
Caso o monitoramento aponte degradação de performance logo após um deploy, execute o **Rollback GitOps**:

1.  Identifique o último commit estável no histórico do repositório.
2.  Execute a reversão via terminal:
    ```bash
    git revert HEAD -m "Rollback: Instabilidade detectada em Produção"
    git push origin main
    ```
3.  O pipeline será disparado automaticamente, restaurando o estado estável anterior no cluster.

### Cenário B: Pod Crash ou Erro 500 Persistente
1.  Verifique os logs em tempo real: `kubectl logs deployment/nexadesk-api -n prod`.
2.  Inspecione eventos do Kubernetes: `kubectl describe pod [NOME_DO_POD] -n prod`.
3.  Force a reinicialização dos serviços: `kubectl rollout restart deployment/nexadesk-api -n prod`.

## 5. Escalabilidade e Recursos (HPA)
A plataforma utiliza **Horizontal Pod Autoscaler (HPA)** para lidar com picos de tráfego. 

* **Gatilho**: O escalonamento inicia ao atingir 70% de consumo médio de CPU.
* **Limites**: A infraestrutura está configurada para escalar de 2 até 10 réplicas.
* **Comando de Auditoria**: `kubectl get hpa -n prod`

---
*Última revisão: Fevereiro de 2026*