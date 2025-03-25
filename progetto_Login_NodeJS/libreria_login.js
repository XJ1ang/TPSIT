const express = require('express');
const session = require('express-session');
const fs = require('fs');


//verifica se il file è presente se no restituisce un array vuota
function leggiUtenti(){
    const file='credenziali.json';
    try {
        const data = fs.readFileSync(file, 'utf8');
        return  JSON.parse(data);
      } catch (err) {
        console.error("Errore nella lettura del file:", err.message);
      }
      
    return [];

}

//controlla se è presente la sessione attiva

function checkAuth(req,res,next){
    if(!req.session.user){
        return res.redirect('/login.ejs')
    }

    next();
}

module.exports={
    leggiUtenti,
    checkAuth
}