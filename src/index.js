import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"; 
import { typeDefs } from "./schema.js"; 
import db from "../db.js";


// you dont have to worry about which fields are returned, apolloserver will do that
const resolvers = {
    Query: {
        games() {
            return db.games
        }, 
        reviews() {
            return db.reviews
        }, 
        authors() {
            return db.authors
        }
    }
}

//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log("Server ready at port", 4000)