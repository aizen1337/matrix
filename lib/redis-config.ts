import { Client,Entity,Schema } from "redis-om";

const client = new Client();

async function connect() {

    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Post extends Entity {}
let schema = new Schema(Post, {
    title: { type: 'string'},
    snippet: {type: 'string'},
    image: {type: 'text'},
    body: {type: 'text'},
    timestamp: {type: 'date'}
},
{
    dataStructure: 'JSON'
})

export async function createPost(formData: any) {
    await connect();
    const repository = client.fetchRepository(schema)
    const post = repository.createEntity(formData)
    const id = await repository.createAndSave(post)
    return id
}
export async function createIndex() { 
    await connect()
    const repository = client.fetchRepository(schema)
    await repository.createIndex();
}
export async function searchPosts(query: string) {
    await connect();
    const repository = client.fetchRepository(schema);
    const posts = await repository.search()
    .where('title').eq(query)
    .or('snippet').eq(query)
    .or('body').matches(query)
    .return.all();
    return posts
}