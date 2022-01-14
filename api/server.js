const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use(express.json())

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h1> LETS GET THIS SPRINT DONE!!!!! </h1>`);
});

server.use("*", (req, res, next) => {
    next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` });
  });
  
  function errorHandling(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
  
  server.use(errorHandling);
  
module.exports = server;
