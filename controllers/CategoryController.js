import db from '../db.js'
export async function postCategory(req,res){
    const {name}=req.body
    if(name==''){return res.sendStatus(400)}

    const result= await db.query(`
        SELECT * FROM categories 
    `)
    for(let category of result.rows){
        if(category.name==name){return res.sendStatus(409)}
    }

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
