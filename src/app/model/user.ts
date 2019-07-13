export interface User {
    id?:string,
    email?: string,
    ativo?: boolean,
    imageUrl?: string,
    funcao?: [
        {
            id?:number,
            nome: string
        }
    ],
    igreja?: {
        id?:number,
        nome?:string
    },
    pessoa?: {
        nome?: string,
        telefone?: string
      }
      ,
    perfis?: String [
        
    ]
}

