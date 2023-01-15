const express = require("express");
const userRoute = require("./routes/userRoute")
const port = 9000;
const app = express();

app.use(express.json());
app.use("/api", userRoute);


app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
});

app.get("/", (req,res)=>{
    res.send("Welcome to our Api")
})