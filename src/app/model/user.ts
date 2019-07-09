export interface User {
    id?:number
    name?: string
    email?: string,
    phone?: string,
    password?: string,
    ativo?: boolean,
    funcao?: [
        
    ],
    igreja?: {
        id?:number,
        nome?:string
    },
    pessoa?: {
        nome?: string,
        telefone?: string
      }
}

