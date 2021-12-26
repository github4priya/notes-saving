const express = require("express");
const notes = require("./data/notes")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const noteRoutes = require("./routes/noteRoutes")
const path = require('path');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express();
dotenv.config();
connectDB();

app.use(express.json())
// app.use(notFound);
// app.use(errorHandler);






app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// --------------------development------------------------

__dirname = path.resolve();
if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname, "/frontend/build")))
}
else{
    app.get('/', (req, res)=>{
        res.send("API is running");
    })

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

// --------------------development------------------------



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT}`))