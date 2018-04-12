const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

const BookType = require('./book.type')
const AuthorType = require('./author.type')
const PublisherType = require('./publisher.type')


const BookLoader = require('./loaders/book.loader');
const AuthorLoader = require('./loaders/author.loader');
const PublisherLoader = require('./loaders/publisher.loader');


module.exports = new GraphQLObjectType({
    name: 'query',
    description: 'Query para integração com a API',
    fields: () => ({
        books: {
            description: 'Query que busca livros',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'Id do livro'
                },
                title: {
                    type: GraphQLString,
                    description: 'Título de livro'
                },
                author: {
                    type: GraphQLString,
                    description: 'Autor do livro'
                },
                publisher: {
                    type: GraphQLString,
                    description: 'Editora do livro'
                }
            },
            type: new GraphQLList(BookType),
            resolve: (root, args) => BookLoader.fetchAll(args.id, args.title, args.author, args.publisher)
        },
        authors: {
            description: 'Query que busca autores',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'Id do autor'
                },
                name: {
                    type: GraphQLString,
                    description: 'Nome do autor'
                }
            },
            type: new GraphQLList(AuthorType),
            resolve: (root, args) => AuthorLoader.fetchAll(args.id, args.name)
        },
        publishers: {
            description: 'Query que busca editoras',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'Id da editora'
                },
                name: {
                    type: GraphQLString,
                    description: 'Nome da editora'
                }
            },
            type: new GraphQLList(PublisherType),
            resolve: (root, args) => PublisherLoader.fetchAll(args.id, args.name)
        }
    }),
});