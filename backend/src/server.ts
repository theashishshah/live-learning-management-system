import "dotenv/config";
import app from "./app.js";
import dbConnect from "../infrastructure/database/mongodb.js";

const PORT = Number(process.env.PORT) || 3001;

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error while connecting database. ${error}`);
    });
