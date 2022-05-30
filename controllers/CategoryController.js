import db from '../db.js'
export async function postCategory(req,res){
    const {name}=req.body
    await db.query(`
        INSERT INTO categories 
        (name) 
        VALUES 
        ($1);
    `,[name])
    res.sendStatus(201)
}
export async function getCategory(req,res){
    const result= await db.query(`
        SELECT * FROM categories 
    `)
    res.send(result.rows)
}
