# ViralUp 7.0 — SVG Premium

Abra `index.html` em um navegador moderno. Não precisa de internet, bibliotecas externas ou servidor.

- Criação de personagens SVG masculino/feminino com rosto, cabelo, pele, olhos, barba, roupa e acessórios.
- Três carreiras independentes com salvamento local (`localStorage`). Para alternar, use a engrenagem.
- Mantidos os sistemas de calendário, produção, publicações, inventário, economia, patrocínios e vida pessoal.
- O tempo progride apenas com uma carreira aberta e a aba visível.

Importante: dados salvos são específicos ao navegador e à origem do arquivo. Para preservá-los, não limpe os dados do site.


## Novidade: ViralUp Stories (minigame narrativo)
- 10 acontecimentos fictícios inspirados em desafios reais da vida online.
- Escolhas com efeitos em reputação, seguidores e saldo, variando com o tamanho do público.
- Notificações no sino e avisos clicáveis após novas publicações.
- Comentários agora mostram o texto da resposta escolhida (respeito/retrucar) ou a decisão de ignorar.
- Histórico de decisões no app História, persistido individualmente em cada carreira.
- Eventos aleatórios após publicações e eventos no início de dias seguintes.
- Todos os eventos são simulações, não notícias ao vivo.

## Ajustes de progressão e tempo
- Eventos rendem pouquíssimos seguidores no início (abaixo de 100), com ganho escalonado pela audiência. Reputação mantém seu impacto.
- O relógio e as produções continuam enquanto a página permanece aberta, inclusive em outra aba/janela ou minimizada.
- Fechar e reabrir a página não avança o relógio nem conclui produções: apenas o tempo com o jogo carregado é contado.
- Salvamento periódico durante a partida (a cada 10 segundos), ao mudar de aba e ao sair.

## ViralUp 7.3 — Notificações, celular e painel ADM
- Botão 📱 no topo e na tela principal para abrir o celular.
- A aba Notificações mostra apenas comentários recebidos; botão "Ler todas" marca os comentários como lidos.
- Abra `admin.html` no mesmo navegador/origem para buscar carreiras pelo @, alterar seguidores, curtidas, dinheiro, reputação, dia, apelido e melhorias e enviar um aviso em pop-up.
- O painel é LOCAL e não tem autenticação: **não hospede `admin.html` publicamente**. Não é possível administrar remotamente outras contas via @ sem um backend e autenticação.
- Para evitar divergências, se modificar uma carreira pelo painel, mantenha o jogo na mesma origem. Com outra aba já aberta, a atualização é capturada por evento de armazenamento.
