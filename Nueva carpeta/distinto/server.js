//EJEMPLO DE UNA API BÁSICA
import { API_KEY, STEAM_ID } from "./config.js";

import { createServer } from 'http';
import fs from 'fs';

const server = createServer((req, res) => {
    console.log("URL:", req.url);
    console.log("Método:", req.method);

    if (req.url == '/') {
        const html = fs.readFileSync("index.html")

        res.setHeader("Content-Type", "text/html")
        res.end(html);
    } else if(req.url=='/steam'){
        fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&relationship=friend`)
        .then(r=>r.json()) //response es un objeto RESPONSE, response.json() -> lee el body y lo convierte a objeto, y devuelve otra promesa
        .then(data=>{
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(data))
        })
    } else if (req.url='/steam/more'){
        fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${STEAM_ID}`)
        .then(r=>r.json()) //response es un objeto RESPONSE, response.json() -> lee el body y lo convierte a objeto, y devuelve otra promesa
        .then(data=>{
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(data))
        })
    }
/*
    if (req.url == '/') {
        const html = fs.readFileSync("index.html")

        res.setHeader("Content-Type", "text/html")
        res.end(html);
    } else if (req.url == '/datos') {
        const datos = {
            nombre: 'lau',
            edad: 28,
        }

        res.setHeader("Content-Type", "app/json")
        res.end(JSON.stringify(datos))
    } else {
        res.statusCode = 404;
        res.end("No encontrado");
    }
*/

    /*
    if(req.url=='/'){
        res.end('Pagina principal')
    } else if(req.url=='/casa'){
        res.end('Estas en casa')
    } else if (req.url=='/datos') {
        const datos = {
            nombre: 'Lau', 
            edad: 28,
        };
        //avisamos al navegador de que hay texto en formato json, sino no sabe interpretarlo
        res.setHeader('Content-Type', 'application/json')
        
        //convertimos el objetco en json
        res.end(JSON.stringify(datos))
    } else {
        res.end('error')
    }
    */

    //res.end('Patata Potato')
})

server.listen(3000, () => {
    console.log('Servidor escuchando')
})