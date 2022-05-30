import db from '../db.js'
export async function postGame(req,res){
    const {name,image,stockTotal,categoryId,pricePerDay}=req.body
    await db.query(`
        INSERT INTO games 
        (name,image,stockTotal,categoryId,pricePerDay) 
        VALUES 
        ($1,$2,$3,$4,$5);
    `,[name,image,stockTotal,categoryId,pricePerDay])
    res.sendStatus(201)
}
export async function getGame(req,res){
    const result=await db.query(`
        SELECT games.* categories.name as "categoryName"
        FROM games 
        JOIN categories
        ON games."categoryId"=categories.id
    `)
    res.send(result.rows)
}
