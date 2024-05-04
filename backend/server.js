const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Create a prefix for all incoming requests
// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
// app.get('/author/:type', routes.author);
app.get("/author", routes.author);
app.get("/authorById/:authorId", routes.authorById);
app.get("/authorPapers/:authorId", routes.authorPapers);
app.get("/authorCollaborators/:authorId", routes.authorCollaborators);
app.get("/paper/:paperId", routes.paper);
app.get("/relatedPaper/:paperId", routes.relatedPaper);
app.get("/fieldTopAuthors", routes.topAuthors);
app.get("/fieldTopPapers", routes.topPapers);
app.get("/risingStarPapers", routes.risingStartPapers);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
