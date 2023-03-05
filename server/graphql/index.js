import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 4002;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async (server, port) => {
  await server.start();
  app.use(
    "/api/graphql",
    cors(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
  const listen = await new Promise((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
};
startServer(server, PORT);
// Modified server startup
console.log(`🚀 Server ready at http://localhost:${PORT}/api/graphql`);
