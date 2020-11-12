import { MongoClient} from 'mongodb'


let uri = process.env.MONGODB_URI || ''
let dbName = process.env.MONGODB_DB

let cachedClient: any = null
let chachedDb: any = null

if(!uri){
    throw new Error('Please define the MONGODB_URI enviroment variable inside .env.local')
}

if(!dbName){
    throw new Error('Please define the MONGODB_DB enviroment variable inside .env.local')
}


export async function connectToDatabase(){
    if(cachedClient && chachedDb){
        return {
            client: cachedClient,
            db: chachedDb
        }
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = await client.db(dbName);

    cachedClient = client
    chachedDb = db


    return {
        client,
        db
    }
}