const { GraphQLSchema } = require('graphql');

const QueryType = require('./queries/query.type');
const MutationType = require('./mutations/mutation.type');

module.exports = new GraphQLSchema({
    name: 'Book Schema',
    description: 'Book Schema Description',
    query: QueryType,
    mutation: MutationType
});

