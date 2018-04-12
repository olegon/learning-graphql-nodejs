const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');

const AuthorType = require('../queries/author.type');
const CategoryType = require('../queries/category.type');

const AddAuthorHandler = require('./handlers/add-author.handler');

module.exports = {
    type: AuthorType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Nome do autor'
        },
        isBrazilian: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Informa se o autor é nacional ou estrangeiro.'
        },
        birthday: {
            type: GraphQLString,
            description: 'Data de nascimento do autor'
        },
        nationality: {
            type: GraphQLString,
            description: 'Nacionalidade do autor'
        },
        category: {
            type: CategoryType,
            description: 'Categoria (literária) do autor'
        }
    },
    resolve: (root, inputs) => AddAuthorHandler(root, inputs)
};

