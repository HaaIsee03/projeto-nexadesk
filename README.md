# 🚀 NexaDesk: Modernização DevOps e Confiabilidade SaaS

**Estudante:** Isaias Bruno da Silva Júnior (HaaISee03)
**Curso:** Engenharia de Computação – Centro Universitário UniFECAF
**Projeto:** Implementação de Pipeline CI/CD, GitOps e Cultura SRE

---

## 📋 1. O Desafio NexaDesk
A NexaDesk é uma plataforma SaaS B2B que atende 250 clientes críticos. O cenário operacional inicial apresentava sérios gargalos:
* **Lead Time**: 7 a 12 dias para entregas em produção.
* **Processos**: Deploys manuais baseados em checklists físicos e planilhas.
* **Risco**: Histórico de incidentes pós-release exigindo rollbacks manuais demorados.

Este projeto propõe e implementa uma solução técnica para automatizar o ciclo de vida da aplicação, reduzindo riscos e aumentando a frequência de entregas.

## 🏗️ 2. Arquitetura da Solução
A infraestrutura foi desenhada seguindo o modelo de microsserviços conteinerizados:
* **API (Node.js)**: Core de gestão de chamados.
* **Worker (Node.js)**: Processamento assíncrono de tarefas.
* **Orquestração**: Kubernetes para gerenciamento de workloads e alta disponibilidade.

## 📂 3. Estrutura do Repositório
Conforme exigido pelas diretrizes do projeto, o repositório está organizado da seguinte forma:
* `/.github/workflows/`: Pipeline CI/CD declarativo via GitHub Actions.
* `/app/`: Código fonte dos serviços API e Worker.
* `/environments/staging/`: Manifestos Kubernetes para ambiente de homologação.
* `/environments/prod/`: Manifestos para ambiente de produção com HPA e escalabilidade.
* `RUNBOOK.md`: Guia de resposta a incidentes e checklist de deploy.

## ⚙️ 4. Fluxo de Deploy e Pipeline CI/CD
O pipeline automatizado garante que cada alteração passe por validações rigorosas antes da promoção de ambiente:

1. **Build e Tagging**: Geração de imagens Docker imutáveis utilizando o SHA do commit para rastreabilidade total.
2. **Static Validation (IaC)**: Validação sintática automática dos manifestos YAML para evitar falhas de configuração no cluster.
3. **Promoção via GitOps**: O repositório atua como fonte única da verdade. O estado desejado definido nos diretórios de ambiente é reconciliado no cluster.

## 🛠️ 5. Instruções de Execução
Para validar e executar a solução localmente, siga os passos abaixo:

### Pré-requisitos
* Docker Desktop com Kubernetes ativado.
* CLI do `kubectl` instalada e configurada.

### Passo a Passo
1. **Clone o repositório**:
   ```bash
   git clone [https://github.com/HaaISee03/projeto-nexadesk.git](https://github.com/HaaISee03/projeto-nexadesk.git)