// Funkcja do pobierania danych z Google Sheets i aktualizowania tabeli HTML
function fetchAndUpdateData() {
    const sheetId = '18961azH0ONUgJ_k-WZLHdvggzOZM-r96FAKQ63S-BOw'; // Zmień na ID swojego arkusza Google Sheets
    const apiKey = 'AIzaSyD9GhpCPkgF1ne_qjLAc3RrKGaIBZd5urI';  // Zmień na swój klucz API z Google Cloud
    const range = 'Sheet1!B:J';     // Zakres danych, który chcesz pobrać (np. kolumny A-D na arkuszu Sheet1)

    // Tworzymy URL do API Google Sheets
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    // Wykonujemy zapytanie fetch do Google Sheets API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Przetwarzamy dane z odpowiedzi API
            const rows = data.values;
            const tableBody = document.querySelector('table tbody');

            // Czyścimy istniejące dane w tabeli
            tableBody.innerHTML = '';

            // Dodajemy dane z Google Sheets do tabeli
            rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Błąd podczas pobierania danych:', error));
}

// Funkcja do cyklicznego aktualizowania danych co minutę
setInterval(fetchAndUpdateData, 60000); // Aktualizacja co 60,000 ms (czyli 1 minuta)

// Pierwsze pobranie danych po załadowaniu strony
fetchAndUpdateData();
