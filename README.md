
# Como utilizar o simulador de Autômatos Finitos Não Determinísticos
O arquivo 'entries.txt' possui um exemplo de como informar um autômato, além disto, abaixo tem-se mais informações de como utilizar e declarar as informações neste simulador.

## Informando o alfabeto e os estados
#
Os elementos do alfabeto devem ser informados na primeira linha do arquivo 'entries.txt', separados por espaço.

Os estados devem ser informados na segunda linha do arquivo 'entries.txt', separados por espaço.
Para utilizar o símbolo epson, deve-se declarar como elemento do alfabeto os caracteres '%e'.

## Informando o estado inicial e os estados de aceitação
#
O estado inicial deve ser informado na terceira linha do arquivo 'entries.txt'

Os estados de aceitação devem ser informados na segunda linha do arquivo 'entries.txt', separados por espaço caso haja mais de um.

## Informando as transições
#
Deve ser listada uma transição por linha e após listar as transições de um estado, deve-se colocar os caracteres '--' sozinhos em uma linha para indicar que foram finalizadas as transições de um estado.

Quando um estado não possui transição para determinado elemento do alfabeto, deve-se utilizar o caractere '*' para representar a falta de transição.

Quando um estado possuir uma transição para mais de um estado para determinado elemento do alfabeto, deve-se separar os estados por espaço.

As transições de cada estado devem seguir a ordem em que foram declarados os estados. Assim como a transição que corresponde a cada elemento do alfabeto também deve seguir a ordem em que os elementos foram declarados.

Exemplo de declaração do arquivo entries.txt:
```
1 2 # Linha do alfabeto
q1 q2 q3 # Linha com os estados
q1 # Linha com o estado inicial
q3 # Linha com os estados de aceitação
q1 # Transição do estado q1 para o elemento do alfabeto '1'
q2 # Transição do estado q1 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q1
q3 # Transição do estado q2 para o elemento do alfabeto '1'
* # Transição do estado q2 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q2
q1 q2 # Transição do estado q3 para o elemento do alfabeto '1'
* # Transição do estado q3 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q3
```

## Instalando o projeto do simulador
#
Para utilizar o simulador é preciso que se tenha instalado o NodeJs na máquina, caso o mesmo não esteja instalado é preciso [instalá-lo](https://nodejs.org/en/download/).

Para utilizar o simulador pela primeira vez, é preciso:
- Clonar este repositório: `https://github.com/caroltrindade/univille-afndSimulator.git`

- instalar as dependências do projeto (dentro da pasta do projeto): `npm install`

## Executando o simulador
#
Para executar o simulador basta entrar na pasta do projeto do simulador e executar o comando `node index.js`.

## Informando a entrada
#
Assim que o simulador é executado, por padrão, é sugerido uma entrada (011) que é considerada quando nenhuma entrada é informada, ou seja, é somente teclado 'Enter'.

Para inserir a entrada basta digitar a entrada no campo em que é solicitada, conforme a imagem:

![image](https://user-images.githubusercontent.com/32417804/117222953-03ed5900-ade3-11eb-945d-a92f4efd540a.png)

Caso a entrada possua símbolos que não estejam no alfabeto, o símbolo inválido será ignorado e o simulador continuará a execução até que encontre o próximo símbolo válido (que esteja no alfabeto)).

## Retornos sobre o autômato executado
As informações acerca da execução do autômato estão divididas entre os arquivos:
- **entries.txt:** Descrição do autômato e suas informações. Possui um autômato já descrito, para exemplificar.
- **steps.txt:** Descreve a execução do autômato, as entradas lidas e os estados atuais após a leitura de cada entrada.
- **result.txt:** O resultado do autômato, informando se a entrada foi aceita, ou rejeitada. Ou seja, informando se a execução do autômato terminou com alguma cópia no estado de aceitação.
