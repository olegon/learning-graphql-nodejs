const { GraphQLObjectType } = require('graphql');

const AddAuthorType = require('./add-author.type.js');

module.exports = new GraphQLObjectType({
    name: 'mutation',
    description: 'Manipular objetos no banco de dados',
    fields: {
        addAuthor:AddAuthorType
    }
});

