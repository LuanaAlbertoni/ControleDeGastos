class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarMovimento()
    }

    criarMovimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS movimento (id INT NOT NULL AUTO_INCREMENT,'+
        ' descricao varchar(50) NOT NULL,'+
        'valor double NOT NULL,'+
        'tipo varchar(1) NOT NULL,'+
        'observacao text,'+
        'data DATETIME NOT NULL,'+
        'dataCriacao DATETIME NOT NULL,'+
        'PRIMARY KEY(id))'
        this.conexao.query(sql, erro =>{
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela movimento criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas