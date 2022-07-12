const express = require("express");
const app = express();
const userRoutes = require("./route/user");
const postRoutes = require("./route/post");
const commentaireRoutes = require("./route/commentaire");
const cors = require("cors");
const path = require("path");
app.use(cors());

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/auth", userRoutes);
app.use("/post", postRoutes);
app.use("/commentaire", commentaireRoutes);

app.listen("3001", () => {
 console.log("Listen on port 3001");
});