// Função que será chamada ao clicar no botão
function consultarCnpj() {
    // Obtém o valor do campo CNPJ
    const cnpj = document.getElementById('cnpj').value;

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
        alert("Por favor, insira um CNPJ válido com 14 dígitos.");
        return; // Interrompe a execução da função se o CNPJ for inválido
    }

    // Limpa resultados anteriores
    document.getElementById('nome_empresa').textContent = '';
    document.getElementById('bairro').textContent = '';
    document.getElementById('cidade').textContent = '';
    document.getElementById('estado').textContent = '';
    document.getElementById('status').textContent = '';

    // Exibe o indicador de carregamento
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';

    // URL da API de CNPJ (usando o serviço BrasilAPI)
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

    // Faz uma requisição à API para obter os dados do CNPJ
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('CNPJ não encontrado ou inválido.'); // Erro personalizado
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            // Atualiza os campos no formulário com os dados retornados pela API
            document.getElementById('nome_empresa').textContent = data.razao_social;
            document.getElementById('bairro').textContent = data.bairro || "Informação não disponível"; // Verifica se o bairro existe
            document.getElementById('cidade').textContent = data.municipio || data.cidade || "Informação não disponível"; // Considera possíveis nomes
            document.getElementById('estado').textContent = data.uf || "Informação não disponível"; // Adicionando estado
            document.getElementById('status').textContent = data.status || "Informação não disponível"; // Adicionando status

            // Exibe os resultados
            document.getElementById('resultado').style.display = 'block';
        })
        .catch(error => {
            console.error("Erro ao consultar o CNPJ:", error); // Loga erros no console
            alert(error.message); // Exibe a mensagem de erro ao usuário
        })
        .finally(() => {
            // Esconde o indicador de carregamento
            document.getElementById('loading').style.display = 'none';
        });
}
