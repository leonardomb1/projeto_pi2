export class Contato{
    constructor(nome, email, telefone){
        this.nome = nome,
        this.email = email,
        this.telefone = telefone
    }
}

export const getContatos = () => {
    return dbContatos
}

export const dbContatos = [
    new Contato("Teste", "teste@teste.com", "19 98756-2957")
]