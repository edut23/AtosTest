export interface ProductError{
    id: number,
    dsProduto: string,
    vlProduto: string,
    dsCategoria: string,
    dtProduto: string,
    cdProduto: string,
    qtdProduto: string
}

export interface Products{
    id: number,
    dsProduto: string,
    vlProduto: number,
    dsCategoria: string,
    dtCadastro: string,
    cdProduto: string,
    qtdProduto: number
}