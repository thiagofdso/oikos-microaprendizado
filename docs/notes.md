# Notas do Projeto

- 2026-03-30: `@fontsource-variable/surt` ainda não existe no npm. Foi criado um pacote local "fonts/surt" com um `@font-face` provisório para manter a API estável até a fonte oficial ser publicada. Atualizar e remover o shim assim que o pacote for disponibilizado.
- 2026-03-30: Navegação do LiquidMenu usa `next/link`, mas previne navegações para rotas ainda não implementadas (pastor/admin/trilha/etc.) para evitar 404 temporários. Atualizar os hrefs e remover o `preventDefault` assim que as rotas forem criadas.
