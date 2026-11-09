
var nomesProdutos = []
var precosProdutos = []
var totaisVendas = []

var quantidadeProdutos = 0
var quantidadeVendas = 0
var op


function cadastrarProduto(){

    var produto
    var preco
    var auxiliar = 0

    produto = prompt("Informe o nome do produto: ")

    while(produto == null || produto == ""){
        if(produto == null){
            return
        }

        alert("O produto não pode ficar sem nome!")
        produto = prompt("Informe o nome do produto: ")
    }

    for(var i = 0; i < quantidadeProdutos; i++){
        if(produto == nomesProdutos[i]){
            auxiliar = 1
        }
    }

    if(auxiliar == 1){
        alert("Já existe um produto com esse nome!")
        return
    }

    preco = parseFloat(prompt("Informe o preço do produto: "))

    while(preco <= 0 || preco == null){
        alert("O preço precisa ser maior que R$ 0!")
        preco = parseFloat(prompt("Informe o preço do produto: "))
    }

    nomesProdutos[quantidadeProdutos] = produto
    precosProdutos[quantidadeProdutos] = preco

    quantidadeProdutos++

    alert("Produto cadastrado com sucesso!")
}


function listarProdutos(){

    var lista = ""

    if(quantidadeProdutos == 0){
        alert("Não existem produtos cadastrados!")
        return
    }

    for(var i = 0; i < quantidadeProdutos; i++){

        lista = lista +
        "\nCódigo: " + (i + 1) +
        "\nProduto: " + nomesProdutos[i] +
        "\nPreço: R$ " + precosProdutos[i].toFixed(2) +
        "\n----------------------"
    }

    alert("PRODUTOS CADASTRADOS\n" + lista)
}


function calcularTotalVenda(preco, quantidade){

    var subtotal = preco * quantidade

    return subtotal
}


function calcularDesconto(total){

    var desconto = 0

    if(total > 50){
        desconto = total * 0.10
    }

    return desconto
}


function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto){

    var totalFinal = subtotal - desconto

    alert(
        "RESUMO DA VENDA\n\n" +
        "Produto: " + nome +
        "\nPreço unitário: R$ " + preco.toFixed(2) +
        "\nQuantidade: " + quantidade +
        "\nSubtotal: R$ " + subtotal.toFixed(2) +
        "\nDesconto: R$ " + desconto.toFixed(2) +
        "\nTotal a pagar: R$ " + totalFinal.toFixed(2)
    )
}


function obterTotalVendasDia(){

    var total = 0

    for(var i = 0; i < quantidadeVendas; i++){
        total = total + totaisVendas[i]
    }

    return total
}


function exibirTotalVendasDia(){

    if(quantidadeVendas == 0){
        alert("Não existem vendas registradas!")
        return
    }

    var total = obterTotalVendasDia()

    alert(
        "RESUMO DAS VENDAS DO DIA\n\n" +
        "Quantidade de vendas: " + quantidadeVendas +
        "\nTotal vendido: R$ " + total.toFixed(2)
    )
}


function realizarVenda(){

    var codigo
    var quantidade
    var subtotal
    var desconto
    var totalFinal
    var preco
    var nome

    if(quantidadeProdutos == 0){
        alert("Não existem produtos cadastrados!")
        return
    }

    listarProdutos()

    codigo = parseInt(prompt("Informe o código do produto: "))

    while(codigo < 1 || codigo > quantidadeProdutos){
        alert("Código inválido!")
        codigo = parseInt(prompt("Informe o código do produto: "))
    }

    quantidade = parseInt(prompt("Informe a quantidade desejada: "))

    while(quantidade <= 0){
        alert("A quantidade precisa ser maior que zero!")
        quantidade = parseInt(prompt("Informe a quantidade desejada: "))
    }

    preco = precosProdutos[codigo - 1]
    nome = nomesProdutos[codigo - 1]

    subtotal = calcularTotalVenda(preco, quantidade)

    desconto = calcularDesconto(subtotal)

    totalFinal = subtotal - desconto

    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto)

    if(confirm("Deseja confirmar esta venda?")){

        totaisVendas[quantidadeVendas] = totalFinal

        quantidadeVendas++

        alert("Venda realizada com sucesso!")

    }else{

        alert("Venda cancelada!")
    }
}


function exibirMenu(){

    var op

    op = parseInt(prompt(
        "BEM-VINDO(A) AO MENU!\n\n" +
        "1. Cadastrar produto\n" +
        "2. Listar produtos\n" +
        "3. Realizar venda\n" +
        "4. Consultar total de vendas\n" +
        "5. Encerrar sistema\n\n" +
        "Escolha uma opção: "
    ))

    return op
}


function executarSistema(){

    do{

        op = exibirMenu()

        if(op < 1 || op > 5){
            alert("Opção inválida!")
        }else{

            switch(op){

                case 1:
                    cadastrarProduto()
                    break

                case 2:
                    listarProdutos()
                    break

                case 3:
                    realizarVenda()
                    break

                case 4:
                    exibirTotalVendasDia()
                    break

                case 5:
                    alert("Sistema encerrado!")
                    break
            }
        }

    }while(op != 5)
}


executarSistema()