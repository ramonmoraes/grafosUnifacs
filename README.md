# Grafos Unifacs
[![Build Status](https://travis-ci.org/ramonmoraes/grafosUnifacs.svg?branch=master)](https://travis-ci.org/ramonmoraes/grafosUnifacs)

### Developing
```
npm run dev
```
### Testing
```
npm test
```
## Features

Implementar um TAD (Tipo Abstrato de Dados), onde
contemple funcionalidades específicas de um grafo.


# V1

| Task | DoneWith |
|------|----------|
| Inclusão de um grafo com seus vértices e arestas | constructor + createLinks|
| Teste a existência de uma aresta entre 2 vértices | createLinks | 
| Permita a inserção e a remoção de vértices | addNone && removeNodeByIdentifier |
| Permita a inserção e a remoção de uma aresta entre 2 vértices | removeLinkByIdentifier |
| Obtenha os vértices adjacentes a um determinado vértice | getAdjacentNodesByIdentifier |
| Obtenha o grau de um determinado vértice | getNodeOrderByIdentifier |
| Obtenha o grau médio, o grau mínimo e o grau máximo | calcGraphOrder |
| Identifique se o grafo é conexo | breadthFirstSearch |

# V2

- [ ] Implementar a solução para a atividade 1 apresentando a Matriz de Adjacências.

- [ ] Adicionar uma funcionalidade na solução adotada para identificar a existência de um caminho de Euler.

- [X] Criar um padrão para entrada de dados a partir da leitura de um arquivo para geração do grafo.
```
getGraphFromFile // example.json
```