const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askUser() {
    rl.question('Saisissez un message (ou "exit" pour quitter) : ', (message) => {
      if (message.toLowerCase() === 'exit') {
        console.log('Vous avez saisi "exit". Fin du programme.');
        rl.close();
      } else {
        console.log("Processing...");
        fetch('http://51.178.17.129/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        }).then(response => response.text()).then((response) => {
                console.log('\x1b[32m%s\x1b[0m', 'Réponse du serveur :', response);
                askUser();
            }).catch((error) => {
                console.error('Erreur lors de la communication avec le serveur :', error);
            });
        }
    });
}
askUser();