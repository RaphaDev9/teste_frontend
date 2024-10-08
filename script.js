// mascara input

function mascaraInput(){
    $("#cnpj").inputmask("99.999.999/9999-99");
}

// consulta CNPJ

function getCNPJ(){
    let cnpj = $("#cnpj").val();
    const numCNPJ = cnpj.replace(/\s+/g, "").replace(/\D/g, ""); // regex para remover os espaços em branco e caracteres especiais

    if (numCNPJ.length !== 14){
        alert("Insira um CNPJ válido");
        return;
    }

    consultaCNPJ(numCNPJ);
}

function consultaCNPJ(cnpj){
    $.ajax({
        url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
        method: "GET",
        success: function(dados) {

            // juntar dados do endereço
            let endereco = JSON.stringify(dados.descricao_tipo_de_logradouro + " " + dados.logradouro + ", " + dados.numero + " - " + dados.bairro + " - " + dados.municipio).replaceAll('"','');

            $("input.tbl[name='nome']").val(verificarDados(JSON.stringify(dados.nome_fantasia).replaceAll('"','')));
            $("input.tbl[name='social']").val(verificarDados(JSON.stringify(dados.razao_social).replaceAll('"','')));
            $("input.tbl[name='abertura']").val(verificarDados(JSON.stringify(dados.data_inicio_atividade).replaceAll('"','')));
            $("input.tbl[name='situacao']").val(verificarDados(JSON.stringify(dados.descricao_situacao_cadastral).replaceAll('"','')));
            $("textarea.tbl[name='atividade']").val(verificarDados(JSON.stringify(dados.cnae_fiscal_descricao).replaceAll('"','')));
            $("textarea.tbl[name='endereco']").val(verificarDados(endereco));
            $("input.tbl[name='telefone']").val(verificarDados(JSON.stringify(dados.ddd_telefone_1).replaceAll('"','')));
            $("input.tbl[name='email']").val(verificarDados(JSON.stringify(dados.email).replaceAll('"','')));

            // consultar se existe sócio
            let socios = dados.qsa;
            if(socios.length > 0){
                gerarCard(socios);
            }

            $(".tabela-dados button#editar").show(); // exibir botão de edição

        },
        error: function(xhr, status, error) {
            $(".erro").show();
            setTimeout(function(){
                $(".erro").hide();
            },2000);
        }
    });
}

// verificar se os dados estão preenchidos no cadastro

function verificarDados(dados){
 if(dados == ""){
    return "Dados não cadastrados"
 } else{
    return dados
 }
}

function gerarCard(socios){
    socios.forEach(socio => {
        $(".cards").append(`
        <div class="socio">
            <label for="nome-socio">Nome: </label>
            <p class="nome-socio">${socio.nome_socio}</p>
            <label for="cpf-cnpj-socio">CPF/CNPJ: </label>
            <p class="cpf-cnpj-socio">${socio.cnpj_cpf_do_socio}</p>
            <label for="qualificacao">Qualificação: </label>
            <p class="qualificacao">${socio.qualificacao_socio}</p>
            <label for="data-entrada">Data de Entrada: </label>
        <p class="data-entrada">${socio.data_entrada_sociedade}</p>
        </div>`);
        $(".tabela-socios").show();
    });
}

function editActive(){
    $(".tabela-dados input, .tabela-dados textarea").removeAttr("readonly").addClass("edit");
    $(".tabela-dados button#edit-form").show();
}

function editForm(){
    let cnpj = $("input#cnpj").val().replace(/\s+/g, "").replace(/\D/g, "");
    const nome = $("input.tbl[name='nome']").val();
    const social = $("input.tbl[name='social']").val();
    const abertura = $("input.tbl[name='abertura']").val();
    const situacao = $("input.tbl[name='situacao']").val();
    const atividade = $("textarea.tbl[name='atividade']").val();
    const endereco = $("textarea.tbl[name='endereco']").val();
    const telefone = $("input.tbl[name='telefone']").val();
    const email = $("input.tbl[name='email']").val();

    $.ajax({
        url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
        method: "PATCH",
        data: {
            nome_fantasia: nome,
            razao_social: social,
            data_inicio_atividade: abertura,
            descricao_situacao_cadastral: situacao,
            cnae_fiscal_descricao: atividade,
            logradouro_completo: endereco,
            ddd_telefone_1: telefone,
            email: email
        },
        success: function(dados) {
            console.log("dados enviados corretamente: ", dados);
            alert("Dados enviados com sucesso!");
        },
        error: function(xhr, status, error) {
            console.log("ocorreu um erro", error)
            alert("Ocorreu um erro ao tentar atualizar os dados, tente novamente mais tarde.")
        }
    });
}

$(document).ready(function(){
    mascaraInput();
});

// fazer script para mudar os dados da api
