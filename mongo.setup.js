const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/graphql';

async function setup() {
    const client = await MongoClient.connect(MONGODB_URI);

    const authors = client.db('graphql').collection('authors');
    const publishers = client.db('graphql').collection('publishers');
    const books = client.db('graphql').collection('books');

    authors.deleteMany({});
    publishers.deleteMany({});
    books.deleteMany({});

    const authorErnestCline = await authors.insert(
        {
            name: 'Ernest Cline',
            isBrazilian: false,
            age: 46,
            birthday: new Date(1972, 3 - 1, 29),
            nationality: 'US',
            category: 'science_fiction'
        }
    );

    const authorIsaacAsimov = await authors.insert(
        {
            name: 'Isaac Asimov',
            isBrazilian: false,
            age: null,
            birthday: new Date(1920, 1 - 1, 2),
            nationality: 'US',
            category: 'science_fiction'
        }
    );

    const authorEduadorSpohr = await authors.insert(
        {
            name: 'Eduardo Spohr',
            isBrazilian: true,
            age: 41,
            birthday: new Date(1976, 6 - 1, 5),
            nationality: 'BR',
            category: 'science_fiction'
        }
    );

    const pubLeya = await publishers.insert({
        name: 'LeYa'
    });

    const pubAleph = await publishers.insert({
        name: 'Aleph'
    });

    const pubVerus = await publishers.insert({
        name: 'Verus'
    });

    await books.insert({
        title: 'Ready Player One',
        page_count: 464,
        isBrazilian: false,
        author: authorErnestCline.insertedIds['0'],
        publisher: pubVerus.insertedIds['0']
    });
    
    client.close();
}

setup();