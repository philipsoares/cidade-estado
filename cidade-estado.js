jQuery(document).ready(function ($) {

    //Pega os parametros da URL (opcional)
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    //Requisita o JSON para receber os dados
    //#edit-field-estado-value e #edit-field-cidade-value são ID's de elementos SELECT
    $.getJSON('example.json', function (data) {

        var items = [];
        var estadoAtual = [];
        var options = '<option value="">Estado</option>';	

        $.each(data, function (key, val) {        
            if( $.inArray(val.sigla, estadoAtual) == -1 ){
               options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
               estadoAtual.push(val.sigla);
            }
        });					
        $("#edit-field-estado-value").html(options);				

            $("#edit-field-estado-value").change(function () {				

                var options_cidades = '<option value="" disabled>Cidade</option>';
                var str = "";
                var cidadeAtual = [];

                $("#edit-field-estado-value option:selected").each(function () {
                    str += $(this).text();
                });

                $.each(data, function (key, val) {

                    if(val.nome == str) {             
                        if( $.inArray(val.cidades, cidadeAtual) == -1 ){
                           options_cidades += '<option value="' + val.cidades + '">' + val.cidades + '</option>';
                           cidadeAtual.push(val.cidades);
                        }						
                    }
                });

                $("#edit-field-cidade-value").html(options_cidades);

            }).change();

        }).always(function() {

            //Verifica se os dados ja estao na URL (opcional)
            var urlEstado = getUrlParameter('field_estado_value');
            var urlCidade = getUrlParameter('field_cidade_value');
            if( (urlEstado != undefined) && (urlCidade != undefined) ){
                urlCidade = urlCidade.replace(/\+/g, ' ');
                $("#edit-field-estado-value").val(urlEstado).trigger('change');
                $("#edit-field-cidade-value").val(urlCidade).trigger('change');

                $("html, body").animate({
                    scrollTop: $("#edit-field-estado-value").offset().top
                }, 0);

            }
        });	
});