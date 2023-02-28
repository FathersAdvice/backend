import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./typeDefs";
import resolvers from './resolver';


const server = new ApolloServer({
    typeDefs,
    resolvers,
});


let { url } = new Promise((resolve, reject)=> {
    try {
        const url = startStandaloneServer(server, {
            listen: { port: 4002 },
        })
        resolve(url);
    }catch(e){
        reject(e);
    };
}).then(resolvers => resolvers);


console.log(`🚀  Server ready at: ${url}`);