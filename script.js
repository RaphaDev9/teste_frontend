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
            $("input.tbl[name='atividade']").val(verificarDados(JSON.stringify(dados.cnae_fiscal_descricao).replaceAll('"','')));
            $("input.tbl[name='endereco']").val(verificarDados(endereco));
            $("input.tbl[name='telefone']").val(verificarDados(JSON.stringify(dados.ddd_telefone_1).replaceAll('"','')));
            $("input.tbl[name='email']").val(verificarDados(JSON.stringify(dados.email).replaceAll('"','')));

        },
        error: function(xhr, status, error) {
            $(".tabela-dados").text("Não foi possível obter os dados.");
            setTimeout(function() {
                location.reload();
            }, 2000);
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

$(document).ready(function(){
    mascaraInput();
});