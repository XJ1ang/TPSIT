const express = require('express');
const app = express();
const path = require('path');
const fs= require('fs');
const ll= require('./libreria_login');
const session = require('express-session');
var sessione_attiva=false;

// Impostiamo il body-parser per gestire i dati dei form
app.use(express.urlencoded({ extended: true }));

// Impostiamo EJS come motore di template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Endpoint GET per la visualizzazione della home
app.get('/', (req, res) => {
  fs.readFile('conversazioni.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Errore nella lettura del file:', err);
      return res.status(500).send('Errore nel caricamento delle conversazioni.');
    }

    let conversazioni = [];
    try {
      conversazioni = JSON.parse(data); // Parso il JSON solo se il file contiene dati validi
    } catch (e) {
      console.log('File JSON vuoto o malformato, inizializzo un array vuoto.');
    }

    res.render('home', { 
      conversazioni: conversazioni,
      avviso:""
    });
  });
});


app.use(express.static('public'));
app.use('/nav', express.static(path.join(__dirname, 'nav')));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


//?????
app.use(session({
  secret: 'oiierroveraciogamood',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false} //true solo per https
}))
//route alle pagine
app.get('/profilo', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    res.render('profilo_log.ejs', { n: user.nome, e :user.email});
  } else {
    res.render('profilo.ejs');
  }
});

app.post('/index', (req, res) => {
  const testo = req.body.inputTesto;
  
  if (!req.session.user) {
    return res.render('home', { avviso: "Devi effettuare il login per inviare messaggi.", conversazioni: [] });
  }

  const name = req.session.user.nome;
  const nuovoMessaggio = { txt: testo, name: name };

  fs.readFile('conversazioni.json', 'utf8', (err, data) => {
    let conversazioni = [];

    if (!err && data) {
      try {
        conversazioni = JSON.parse(data);
      } catch (e) {
        console.log('Errore nel parsing del JSON, inizializzo un nuovo array.');
      }
    }

    conversazioni.push(nuovoMessaggio);

    fs.writeFile('conversazioni.json', JSON.stringify(conversazioni, null, 2), (err) => {
      if (err) {
        console.log('Errore nella scrittura del file:', err);
        return res.status(500).send('Errore nel salvataggio del messaggio.');
      }

      console.log('Messaggio salvato con successo!');
      res.redirect('/'); // Ricarica la pagina con i nuovi messaggi
    });
  });
});




app.post('/login', (req, res) => {

  const { email, psw } = req.body;

  const utenti=ll.leggiUtenti();

  const utente=utenti.find(user=> user.email===email && user.password===psw)

  if(utente){
    sessione_attiva=true;
    req.session.user = utente; 
    res.redirect('/profilo');//aggiungere pagina per il login effettuato
  } else {
    res.render('login.ejs', {
      avviso: "credenziali sbagliate"
    });
  }
  

});

app.get('/registra', (req, res) => {

  res.render('registrazione.ejs',   {avviso:""});  

});


app.get('/login', (req, res) => {

  res.render('login.ejs',{avviso:""});

});

//query delle pagine

app.post('/salva', (req, res) => {
  const pw = req.body.psw;
  const email = req.body.email;
  const nome = req.body.nome;

  const user = {
    nome: nome,
    email: email,
    password: pw
  };

  // Leggi il file JSON e controlla se l'email è già presente
  fs.readFile('credenziali.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Errore nella lettura del file:', err);
      return res.status(500).send('Errore nel salvataggio delle credenziali.');
    }
    else{
      let users = [];

      try {
        users = JSON.parse(data); // Se il file non è vuoto, convertilo in un array
      } catch (e) {
        // Se il file è vuoto o malformato, possiamo iniziare con un array vuoto
        console.log('File vuoto o non valido, creando un nuovo array.');
      }
  
      // Controlla se l'email è già presente
      const emailExists = users.some(user => user.email === email);
      
      if (emailExists) {
        res.render('registrazione.ejs', {
          avviso: "Email già presente"
        });
      } else {
        // Se l'email non è presente, aggiungi il nuovo utente
        users.push(user);
  
        // Scrivi l'array di utenti nel file JSON
        fs.writeFile('credenziali.json', JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log('Errore nella scrittura del file:', err);
            return res.status(500).send('Errore nel salvataggio delle credenziali.');
          }
          
          console.log('File JSON scritto con successo!');
        });
  
        res.render('registrazione.ejs', {
          avviso: "Email salvato con successo"
        });
      }


    }

  });
});



  
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Errore nel logout:', err);
      return res.redirect('/profilo');
    }
    res.redirect('/login');
  });
});

app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});
