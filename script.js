/* mascara input */

function mascaraInput(){
    $("#cnpj").inputmask("99.999.999/9999-99");
}

/* consulta CNPJ */

function getCNPJ(){
    let cnpj = $("#cnpj").val();
    const numCNPJ = cnpj.replace(/\s+/g, "").replace(/\D/g, ""); /* regex para remover os espaços em branco e caracteres especiais */

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

            /* juntar dados do endereço */

            let endereco = JSON.stringify(dados.descricao_tipo_de_logradouro + " " + dados.logradouro + ", " + dados.numero + " - " + dados.bairro + " - " + dados.municipio).replaceAll('"','');

            $("input.tbl[name='nome']").val(JSON.stringify(dados.nome_fantasia).replaceAll('"',''));
            $("input.tbl[name='social']").val(JSON.stringify(dados.razao_social).replaceAll('"',''));
            $("input.tbl[name='abertura']").val(JSON.stringify(dados.data_inicio_atividade).replaceAll('"',''));
            $("input.tbl[name='situacao']").val(JSON.stringify(dados.descricao_situacao_cadastral).replaceAll('"',''));
            $("input.tbl[name='atividade']").val(JSON.stringify(dados.cnae_fiscal_descricao).replaceAll('"',''));
            $("input.tbl[name='endereco']").val(endereco);
            $("input.tbl[name='telefone']").val(JSON.stringify(dados.ddd_telefone_1).replaceAll('"',''));
            $("input.tbl[name='email']").val(JSON.stringify(dados.email).replaceAll('"',''));

        },
        error: function(xhr, status, error) {
            $(".tabela-dados").text("Não foi possível obter os dados.");
        }
    });
}

$(document).ready(function(){
    mascaraInput();

    /* clique no button */
    $("#btnConsulta").click(getCNPJ);
});