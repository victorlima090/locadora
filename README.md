# Projeto Locadora


## Resultados


### Servidor
Como pedido no desafio, fiz a parte do servidor utilizando Node e Express. Pelo que pesquisei entendi que a melhor prática seria separar cada entidade ou apps em pastas diferentes, cada app com seu router, models e serviços. 


Utilizei a lib passport como estratégia de autenticação da api. Alguns endpoints não vi necessidade em estarem protegidos, como o de pegar todos os filmes, outros como adicionar filme, deletar filme, deletar usuário etc... coloquei autenticação. Além disso, criei duas estratégias de autenticação, para os endpoints que apenas usuário com o papel de admin possam acessar




### Client
Na parte do client, assim como foi pedido no desafio utilizei React e Typescript. Utilizei React Bootstrap para criar os componentes pois foi a forma que tive mais familiaridade. 


A página Home é a página que exibe os filmes disponíveis, e onde o usuário, após fazer o login, deve conseguir alugá-los


A página Users é a página onde o usuário se cadastra


Na página de login, é verificado se o usuário está autenticado ou não. Se tiver, deve seguir para a página Home, senão deve permanecer na página de login.




## To Dos 
De imediato pelo perdão pois acabei não conseguindo fazer tudo que tinha planejado. Contudo, segue abaixo o meu planejamento do Projeto


Obs: criar vários issues dentro do repositório e um projeto tambem, onde cada tarefa está melhor descrita


### Servidor
#### Typescript
Pensei em adicionar typescript para melhorar a qualidade e manutenibilidade do código. Com ele, poderia modelar as collections do banco, e assim poder validar o que está escrito ou não. Além disso, poderia validar as request que chegam nos endpoints e verificar se elas estao corretas ou com dados faltantes.


### Client
#### Paginas
Infelizmente não tive tempo para desenvolver melhor as páginas. A página de Home ainda falta o botão de submit e chamada de apis. A página de users ainda precisa ser criada, e a página de Login também está incompleta. Contudo, considerando que os endpoints já estão criados, seguiria o mesmo padrão utilizado na pagina Home, usando react bootstrap para criar os componentes das páginas, e axios para as chamadas de api
