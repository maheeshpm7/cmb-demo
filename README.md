# Git Flow
A master irá contér todo código fonte já testado e versionado, código que está em produção
A develop é onde todo fluxo de trabalho irá ocorrer antes de fazer o release versionado que será feito merge na master
A develop deve sempre conter o código mais atual, onde as branchs de features serão ramificadas tendo ela como base

## Listando suas branchs locais e remotas
$ git branch -a

## Criando a branch develop e enviando para o repositório remoto
$ git fetch origin && git checkout -b develop && git push origin develop

## Padrão de nomenclatura de branch
feature: para novas implementações
release: para finalizar o release e tags
hotfix: para resolver problema crítico em produção que não pode esperar novo release

## Criando a branch de uma nova implementação
$ git checkout -b feature/novo-componente

## Enviar para o repositório remoto
$ git push origin feature/novo-componente

## Desenvolvimento da nova implementação finalizado, merge desta feature com a develop e atualizar o remoto
$ git checkout develop && git merge feature/novo-componente && git push origin develop

## crie a branch de release e enviar para o repositório remoto
$ git checkout -b release/v1.0.1 && git push origin release/v1.0.1

## Realizar os ultimos testes, gerar a tag da versão, com informações de quem fez a tag, data e hash
$ git tag -a v1.0.1 -m “Release do novo componente”

## Conferir se a tag foi gerada e enviar para o repositório remoto
$ git show v1.0.1 && git push origin v1.0.1

## Realizar o merge com a master deste release
$ git checkout master && git merge release/v1.0.1
