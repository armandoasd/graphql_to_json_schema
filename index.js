const {
    graphqlSync,
    getIntrospectionQuery,
    IntrospectionQuery,
    buildSchema
} = require('graphql');
var fs = require('fs');

//import file as string
const inputSchema = fs.readFileSync("./input_schema.graphql",'utf8')

const { fromIntrospectionQuery } = require('graphql-2-json-schema');

const options = {
  ignoreInternals: true,
  nullableArrayItems: true
}

const schema = buildSchema(inputSchema);

// schema is your GraphQL schema.
const introspection = graphqlSync(schema, getIntrospectionQuery()).data;

const jsonSchema = fromIntrospectionQuery(introspection, options);

fs.writeFileSync("./out/output_json_schema.json",JSON.stringify(jsonSchema, null, 2))