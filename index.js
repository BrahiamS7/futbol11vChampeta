// Este va a ser el codigo fuente de el juego o la aplicacion.
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";

// INICIALIZACION
env.config();
const app=express();
const port=3000;
const db= new pg.Client({
    user:process.env.DB_USER,
    host:process.env.HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
});
db.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/Juego",async(req,res)=>{
    const result= await db.query("SELECT * FROM preguntas")
    const preguntas=result.rows
    const nPregunta=Math.floor(Math.random()*preguntas.length)
    const desordPreguntas=[preguntas[nPregunta].opcionc,
    preguntas[nPregunta].opcion1,
    preguntas[nPregunta].opcion2,
    preguntas[nPregunta].opcion3
]
    function oprimirBtn(i){
        console.log(desordPreguntas[i]);
    }
    desordPreguntas.sort(()=>Math.random()-0.5)
    res.render("index.ejs",{
        desordPreguntas:desordPreguntas,
        preguntas:preguntas,
        nPregunta:nPregunta,
        oprimirBtn:oprimirBtn.toString()
    })
})
app.get("/",async(req,res)=>{
    res.render("juego.ejs")
})


app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})