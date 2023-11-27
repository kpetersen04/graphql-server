export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    type Query {
        # when the user queries reviews they expect to get the Reviews - entry point - where queryies can start from
        reviews: [Review]
        games: [Game]
        authors: [Author]
    }
`

//int, float, strings, boolean, ID