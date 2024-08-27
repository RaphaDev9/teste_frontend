# Documentação do Projeto: Consulta CNPJ
## Visão Geral
Este projeto é uma aplicação web que permite consultar e exibir dados de CNPJ de empresas no Brasil. Utiliza a API BrasilAPI para obter informações e exibe essas informações em um formulário. Além disso, permite a edição dos dados exibidos, embora a funcionalidade de atualização via API não esteja implementada devido às limitações da BrasilAPI.

## Estrutura do Projeto

### Arquivos Principais
- index.html - Estrutura HTML da aplicação.
- style.css - Estilos CSS para a aparência da aplicação.
- script.js - Código JavaScript que controla a lógica da aplicação.
  
### Dependências
jQuery: Biblioteca JavaScript para manipulação do DOM e requisições AJAX.
jQuery Inputmask: Plugin para aplicar máscaras em campos de entrada.
Instruções de Uso
Carregar o Projeto

Abra o arquivo index.html em um navegador para visualizar a aplicação.
Consulta de CNPJ

No campo de entrada, digite um CNPJ válido (com ou sem máscara).
Clique no botão de consulta (ícone de lupa).
Os dados da empresa serão exibidos se o CNPJ for válido e os dados forem encontrados.
Edição de Dados

Após a consulta bem-sucedida, um botão de edição se tornará visível.
Clique no botão de edição para tornar os campos editáveis.
Modifique os dados conforme necessário e clique no botão "Atualizar Dados" para tentar enviar as informações atualizadas.
Funcionalidades
mascaraInput()
Aplica uma máscara de CNPJ ao campo de entrada para formatar a entrada conforme o padrão brasileiro.

getCNPJ()
Obtém o valor do CNPJ do campo de entrada, remove caracteres não numéricos e valida o comprimento. Se o CNPJ for válido, chama a função consultaCNPJ().

consultaCNPJ(cnpj)
Realiza uma requisição GET à API BrasilAPI para obter dados de uma empresa com o CNPJ fornecido. Atualiza os campos do formulário com as informações recebidas e exibe um botão de edição se houver sócios.

verificarDados(dados)
Verifica se os dados estão preenchidos. Se não, retorna "Dados não cadastrados"; caso contrário, retorna os dados fornecidos.

gerarCard(socios)
Gera e exibe cards para cada sócio da empresa, mostrando informações como nome, CPF/CNPJ, qualificação e data de entrada.

editActive()
Torna os campos do formulário editáveis e exibe o botão de atualização.

editForm()
Tentativa de atualizar os dados de uma empresa na API BrasilAPI usando o método PATCH. No entanto, a BrasilAPI não suporta operações de escrita, então esta funcionalidade não funcionará com a API atual.
