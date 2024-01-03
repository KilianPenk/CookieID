document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('../app/api/add-users', {
            method: 'POST', // Hier muss die Methode korrekt gesetzt werden (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Die Daten als JSON übergeben
        });

        const data = await response.json();
        console.log(data); // Zeige die Antwortdaten in der Konsole an
        // Hier könntest du je nach Antwort der API verschiedene Aktionen ausführen
    } catch (error) {
        console.error('Error:', error);
    }
});
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch(this.action, { // Verwende this.action, um die URL aus dem Formular zu erhalten
            method: this.method, // Verwende this.method, um die Methode (GET oder POST) aus dem Formular zu erhalten
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);
        // Weitere Verarbeitung der Antwort hier...
    } catch (error) {
        console.error('Error:', error);
    }
});
