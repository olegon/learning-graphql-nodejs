const { MongoClient, ObjectId } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017';

async function handler (root, inputs) {

    if (!inputs.name) throw new Error('O nome é necessário para inserir um autor');
    if (inputs.isBrazilian == null) throw new Error('É necessário informar se é brasileiro ou estrangeiro');
    
    const author = {
        name: inputs.name,
        isBrazilian: inputs.isBrazilian,
        birthday: inputs.birthday != null
            ? new Date(inputs.birthday)
            : null,
        nationality: inputs.nationality,
        category: inputs.category,
        age: inputs.birthday != null 
            ? new Date().getFullYear() - new Date(inputs).getFullYear()
            : null
    };

    const client = await MongoClient.connect(MONGODB_URI);
    const result = await client.db('graphql').collection('authors').insert(author);
    
    return result.ops.shift();
}

module.exports = handler;