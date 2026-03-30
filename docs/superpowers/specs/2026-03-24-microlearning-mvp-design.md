# Microaprendizado para Igrejas – MVP Design Spec

## 1. Objetivo e Contexto
- Criar protótipo responsivo estilo EAD para demonstrar valor a stakeholders em pitches.
- Exibir todas as telas-chave (aluno, pastor, admin) já mockadas, sem lógica funcional nem autenticação real.
- Todos os indicadores e feeds exibem apenas dados fictícios pré-carregados; não haverá integrações ou simulações em tempo real.
- Tom visual "Campus Atlântico": blocos de vidro fosco sobre gradiente areia → marinho, tipografia Surt (display) + IBM Plex Serif.

## 2. Personas Prioritárias
1. **Aluno (primário)** – consome aulas, interage em fórum/comentários, participa do ranking, dá feedback NPS.
2. **Pastor/Gestor (secundário)** – acompanha indicadores, identifica alunos em atenção, configura liberação e conteúdos.
3. **Administrador (terciário)** – cadastra igrejas, define planos, registra pastores e personalizações.

## 3. Escopo do MVP (Mockado)
- Navegação completa pós-login com menu lateral líquido e submenus.
- Fluxos do aluno: home, exploração de sessões/aulas, tela de aula com player/voz, comentários e exercícios, ranking, notificações, NPS.
- Painéis do pastor: indicadores gerais, filtros por sessão, alunos em atenção, visão individual.
- Fórum único com tópicos, filtros e threads encadeadas.
- Gestão: convites/cadastros de alunos, criação/edição de sessões/aulas, configurações de liberação, cadastro de igrejas/planos/cores/pastores.
- Tela de login estática.

## 4. Informações Arquitetadas
- **Cabeçalho fixo**: logo da igreja + breadcrumbs contextuais (ex.: “Aluno ▸ Sessão 2 ▸ Aula 5”). Ícone de notificações com badge mostra novidades.
- **Menu lateral líquido**: itens Home, Sessões, Ranking semanal, Fórum, Dashboard (pastor), Gestão (admin). Submenu de Sessões lista atalhos com status.
- **Layout responsivo**: grid 12 colunas desktop; mobile usa pilhas e drawer inferior para navegação.
- **Papéis e rotas no protótipo**: rotas dedicadas `/aluno`, `/pastor`, `/admin` carregam apenas os itens relevantes no menu. Um link discreto no rodapé (“Trocar visão – somente protótipo”) permite saltar entre rotas para fins de pitch, mantendo a premissa de identificação automática no produto final.

## 5. Fluxo do Aluno
1. **Home**
   - Hero “Seu progresso semanal” com barra de conclusão, pontos do ranking e checkpoints.
   - Carrossel “Sessões em andamento” (cards tipo caderno mostrando % e CTA Continuar).
   - Widget “Sua voz importa” exibindo últimas notas NPS.
2. **Explorer de Sessão**
   - Grade 2 colunas com toggle grade/lista, chips de filtro (status, tipo de aula).
   - Cards exibem número da aula, tipo (texto, áudio-only, exercícios), indicador se já concluída.
   - Bloco final “Feedback da Sessão” com CTA para NPS.
3. **Tela de Aula**
   - Painel esquerdo: texto em IBM Plex Serif, marcador vertical indicando parágrafo atual.
   - Player cápsula central com highlight sincronizado (efeito “luz” sobre o parágrafo lido).
   - Painel direito: joinha + contador, módulo de comentários com replies encadeadas e markdown leve, bloco de exercícios (cards abre modal com perguntas e retorno de pontos), sumarizador de pontos acumulados.
4. **Gamificação e Ranking**
   - Joinhas e conclusão dão pontos instantâneos com microfeedback.
   - Ranking semanal destaca top 5 em cartões empilhados, 1º ampliado.
   - Modal “Ranking completo” com filtros de semana e sessão; sparklines de evolução individual.
5. **Notificações Competitivas**
   - Ícone de sino no cabeçalho; drawer lateral lista eventos (“Maria concluiu Sessão 2”, “João assumiu 1º lugar”, “Nova aula adicionada”).
   - Categorias (Atualizações, Competição, Conteúdo) e toggle para pausar notificações competitivas.

## 6. Dashboard do Pastor
- **Cartões gerais** (gradiente marinho, badges status):
  1. Taxa de conclusão geral.
  2. Taxa média de acertos nas perguntas.
  3. Engajamento em comentários/fórum.
  4. Tempo médio de conclusão por sessão (dropdown para escolher sessão e comparar com meta).
- **Heatmap de Sessões**: linhas = sessões, colunas = métricas (Conclusão, Tempo, NPS). Selecionar sessão sincroniza cartão de tempo médio e destaca aulas.
- **Alunos em Atenção**: lista com avatar, % aulas concluídas, última atividade, botão “Ver progresso”.
- **Visão individual**: tabs Linha do tempo, Pontos & Ranking, Discussões. Mostra sessões concluídas, exercícios respondidos, posts em fórum, notificações geradas.
- **Responsividade**: gráficos viram carrossel de cartões, heatmap simplifica para barras horizontais.

## 7. Fórum e Comentários
- Único lobby com barra de busca, chips (Sessões, Tags, “Do meu pastor”).
- Cards de tópico mostram sessão (pílula colorida), respostas e indicador de atividade.
- Botão flutuante “Nova discussão” abre modal com seletor de sessão opcional, título, descrição (markdown), anexos.
- Threads exibem posts em cascata; replies recuam com linha vertical verde-oliva; joinhas disponíveis.
- Comentários das aulas podem se transformar em tópicos de fórum (mostra link com ícone seta).

## 8. Gestão e Conteúdo
- **Alunos**: tabela com avatar, nome, status, % progresso, data de nascimento, ações Enviar convite / Cadastrar manualmente (modal com nome, data nasc., e-mail, login, senha, validação inline).
- **Liberação de Sessões**: painel com regras (liberar tudo, sequencial, exigir nota mínima). Preview mostra experiência do aluno.
- **Editor de Sessões/Aulas**: cards para cadastrar sessões; dentro da aula definir tipo (texto com leitura, áudio-only, exercícios). Exercícios possuem builder com peso no ranking.
- **Admin – Igrejas & Planos**: lista com nome, endereço, logomarca, cores, telefone, e-mail. Ao abrir: upload de logo, color picker com preview, cadastro do pastor (usuário/senha), configurações de plano (limites de alunos, aulas por sessão, flag de assinatura).
- **Admin – Pastores**: painel para criar usuários pastor, vincular a igreja e enviar credenciais.

## 9. Feedback & NPS
- Ao concluir sessão: tela “Resumo final” (tempo gasto, pontos, conquistas) + controle de 5 estrelas estilo dial pulsante e campo opcional de comentário.
- Widget contínuo na home mostra status das respostas do pastor aos feedbacks.
- Para o protótipo, os widgets apenas exibem estados de exemplo; não há fluxo de dados em tempo real.

## 10. Responsividade & Acessibilidade
- Desktop: grid 12 colunas, cards 4/6 colunas conforme prioridade.
- Tablet: 8 colunas, menu lateral recolhe; mobile: stack vertical, menu vira ícone “gota” com drawer.
- Contraste mínimo AA, tipografia grande (>16px corpo), botões com área 44px.
- Player de áudio com controles acessíveis (play/pause, velocidade), highlight textual acompanha leitura.

## 11. Fora de Escopo (MVP)
- Backend real, autenticação, regras de negócio de planos e limites.
- Notificações push reais; apenas feed visual.
- Automação de convites por e-mail.

## 12. Fidelidade Interativa do Protótipo
- Todos os controles (toggles, filtros, chips, rankings, heatmaps, builders, notificações) exibem estados pré-configurados; não há lógica de mudança em tempo real.
- Para demonstrar diferentes estados, criaremos variações de tela ou props mockadas (ex.: duas capturas do ranking com filtros distintos, cartões com toggle “ligado/desligado” fixo).
- Formulários e modais não executam validação nem salvam dados; botões apenas mostram microfeedback visual (“toast” fake ou mudança de estado estático).
- Indicadores, gráficos e sparklines usam dados hardcoded suficientes para contar a história sem cálculos dinâmicos.
