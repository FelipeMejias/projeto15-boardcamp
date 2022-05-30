import db from '../db.js'
export async function postClient(req,res){
    const {name,phone,cpf,birthday}=req.body
    const result=db.query(`
        SELECT * FROM customers
        WHERE cpf = $1
        ;
    `,[cpf])
    if(result.rows){return res.sendStatus(409)}
    await db.query(`
        INSERT INTO customers 
        (name,phone,cpf,birthday) 
        VALUES 
        ($1,$2,$3,$4);
    `,[name,phone,cpf,birthday])
    res.sendStatus(201)
}
export async function getClient(req,res){
    const {cpf}=req.query
    if(cpf){
        const result= await db.query(`
        SELECT * FROM customers
        WHERE cpf LIKE $1
        `,[`${cpf}%`])
        res.send(result.rows)
    }else{
        const result= await db.query(`
        SELECT * FROM customers 
        `)
        res.send(result.rows)
    }
}
export async function getClientById(req,res){
    const {id}=req.params
    const result= await db.query(`
        SELECT * FROM customers 
        WHERE id=$1
    `,[id])
    if(!result.rows){res.sendStatus(404)}
    res.send(result.rows[0])
}
export async function putClient(req,res){
    const {name,phone,cpf,birthday}=req.body
    const {id}=req.params
    const result=db.query(`
        SELECT * FROM customers
        WHERE cpf = $1
        ;
    `,[cpf])
    if(result.rows[0]){return res.sendStatus(409)}
    await db.query(`
        UPDATE customers 
        SET
            name=$1 ,
            phone=$2 ,
            cpf=$3 ,
            birthday=$4
        WHERE 
            id=$5
        ;
    `,[name,phone,cpf,birthday,id])
    res.sendStatus(200)
}
