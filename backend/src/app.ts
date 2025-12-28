import express from "express";

const app = express();

app.get("/healthcheck", (req, res) => {
    console.log("App is running fine...");

    return;
});

export default app;
