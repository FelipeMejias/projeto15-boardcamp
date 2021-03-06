import db from '../db.js'
import dayjs from 'dayjs'

export async function postRent(req,res){
    const {customerId,gameId,daysRented}=req.body

    const checkCustomer=await db.query(`
        SELECT * FROM customers
        WHERE id=$1
    `,[customerId])
    const checkGame=await db.query(`
        SELECT * FROM games
        WHERE id=$1
    `,[gameId])
    const checkRents=await db.query(`
        SELECT * FROM rentals
        WHERE "gameId"=$1
    `,[gameId])
    if(!checkCustomer.rows || !checkGame.rows || checkRents.rows.length>=checkGame.rows[0].stockTotal || daysRented<=0){
        res.sendStatus(400)
    }

    
    const result=await db.query(`
        SELECT *
        FROM games 
        WHERE id=$1;
    `,[gameId])
    const originalPrice=result.rows[0].pricePerDay* parseInt(daysRented)
    const rentDate=dayjs().format('YYYY-MM-DD')
    await db.query(`
        INSERT INTO rentals 
        ("customerId","gameId","daysRented","rentDate","originalPrice") 
        VALUES 
        ($1,$2,$3,$4,$5);
    `,[customerId,gameId,daysRented,rentDate,originalPrice])
    res.sendStatus(201)
}
export async function getRent(req,res){
    const result= await db.query(`
        SELECT * FROM rentals 
    `)
    let resultCustomer
    let resultGame
    const listaMapeada=result.rows.map(async(obj)=>{
        resultCustomer= await db.query(`
            SELECT * FROM customers
            WHERE customers.id=$1
        `[obj.customerId])
        resultGame= await db.query(`
            SELECT categories.name as "categoryName" ,
            * FROM games 
            JOIN categories
            ON games."categoryId"=categories.id
            WHERE games.id=$1
            ;
        `[obj.gameId])
        return(
            {...obj,
                customer:resultCustomer.rows[0],
                game:resultGame.rows[0]
            }
        )
    })
    res.send(listaMapeada)
}
export async function endRent(req,res){
    const {id}=req.params // esse id está vindo undefined
    
    const result= await db.query(`
        SELECT * FROM rentals 
        WHERE id=$1
        ;
    `,[id])
    
    const {rentDate,daysRented,originalPrice}=result.rows[0]
    const returnDate=dayjs().format('YYYY-MM-DD')
    
    const delay=parseInt(returnDate[8]+returnDate[9])-parseInt(rentDate[8]+rentDate[9])-parseInt(daysRented)
    let delayFee=0
    if(delay>0){delayFee=delay*originalPrice/daysRented}
    
    await db.query(`
        UPDATE rentals 
        SET
            returnDate=$1 ,
            delayFee=$2
        WHERE 
            id=$3
        ;
    `,[returnDate,delayFee,id])
    res.sendStatus(201)
}
export async function deleteRent(req,res){
    const {id}=req.params // esse id está vindo undefined
    await db.query(`
        DELETE FROM rentals
        WHERE id = $1
        ;
    `,[id])
    res.sendStatus(200)
}
