3 - armazene o token gerado em um array (ou objeto, se preferir) no express
Deve salvar login como chave do array e token como valor
Não pode existir duas chaves iguais
4 - no react, armazene o token recebido no session atorage e depois redirecione com o navigate
5 - faça uma rota em que toda vez que o usuário trocar de página o react envia o token armazenado 
no session storage para o express
O express por sua vez verifica se esse token recebido está disponível no array de tokens. Se sim, 
retorna true, 
se não retorna false