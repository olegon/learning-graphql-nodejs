const { MongoClient, ObjectId } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017';

async function fetchAll(id, name) {
    const filter = {};
    
    if (id) filter._id = new ObjectId(id);
    if (id) filter.name = name;

    const client = await MongoClient.connect(MONGODB_URI);

    return await client.db('graphql').collection('publishers')
        .find(filter).toArray();
}

module.exports = {
    fetchAll
};