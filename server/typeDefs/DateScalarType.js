import { GraphQLScalarType } from "graphql"
import { Kind } from "graphql"

const DateType = new GraphQLScalarType({
    name:"Date",
    description:"Date Custom Scalar Type",
    parseValue(val) {
        return new Date(val)
    },
    serialize(val) {
        return new Date(val).getTime();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null 
    }
});
export default DateType;