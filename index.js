const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./src/routes/auth");
const employerRoutes = require("./src/routes/employer");
const candidateRoutes = require("./src/routes/candidate");
const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// app.use("/", (request, result)=>{
//     result.send("Pranam Hanumanji");
// });

app.use("/api/auth",authRoutes);

app.use("/api/employer", employerRoutes);
app.use("/api/candidate", candidateRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});