const express = require("express");
const app = express();
const userRoutes = require("./route/user");
const postRoutes = require("./route/post");
const commentaireRoutes = require("./route/commentaire");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/auth", userRoutes);
app.use("/post", postRoutes);
app.use("/commentaire", commentaireRoutes);

app.listen("3001", () => {
 console.log("Listen on port 3001");
});