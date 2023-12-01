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
        game(_, args) {
            return db.games.find((game ) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        }, 
        review(_, args) {
            return db.reviews.find((review ) => review.id === args.id)
        },
        authors() {
            return db.authors
        }, 
        author(_, args) {
            return db.authors.find((author ) => author.id === args.id)
        },
    }, 
    // Nested query to get all the reviews for that game or the author/game for the review 
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    }, 
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        }, 
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    }, 
    Mutation: {
        deleteGame(_, args) {
            return db.games = db.games.filter((game) => game.id !== args.id)
        }
    }, 
    Mutation: {
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game); 
            return game
        }
    }, 
    Mutation: {
        updateGame(_, args) {
          db.games = db.games.map((game) => {
            if (game.id === args.id) {
                return {...game, ...args.edits}
            }
            return game
          })
          return db.games.find((game) => game.id === args.id)
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