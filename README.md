
# Como utilizar o simulador
O arquivo 'entries.txt' possui um exemplo de como informar um autônamo, além disto, abaixo tem-se mais informações de como utilizar e declarar as informações neste simulador.

## Informando o alfabeto e os estados
#
Os elementos do alfabeto devem ser informados na primeira linha do arquivo 'entries.txt'
Os estados devem ser informados na segunda linha do arquivo 'entries.txt'
Para utilizar o símbolo epson, deve-se declarar como elemento do alfabeto os caracteres '%e'.

## Informando as transições
#
Quando um estado não possui transição para determinado elemento do alfabero, deve-se utilizar o caractere '*' para representar a falta de transição

Deve ser listada uma transição por linha e após listar as transições de um estado, deve-se colocar os caracteres '--' sozinhos em uma linha para indicar que foram finalizadas as transições de um estado. T

As transições de cada estado devem seguir a ordem em que foram declarados os estados. Assim como a transição que corresponde a cada elemento do alfabeto também deve seguir a ordem em que os elementos foram declarados
Por exemplo:
```
1 2 # Linha do alfabeto
q1 q2 q3 # Linha com os estados
q1 # Transição do estado q1 para o elemento do alfabeto '1'
q2 # Transição do estado q1 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q1
q3 # Transição do estado q2 para o elemento do alfabeto '1'
* # Transição do estado q2 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q2
q1 # Transição do estado q3 para o elemento do alfabeto '1'
* # Transição do estado q3 para o elemento do alfabeto '2'
-- # Indica que foram finalizadas as transições do estado q3
```
## Informando a entrada
#
Caso a entrada possua símbolos que não estejam no alfabeto, o símbolo inválido será ignorado e o simulador continuará a execução até que encontre o próximo símbolo válido (que esteja no alfabeto))