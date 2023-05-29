fetch('https://www.astropro.co.il/birth-chart-free', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // Add other headers if required
  },
  body: new URLSearchParams({
    'dt_firstname': firstName, // Use the firstName state variable here
    'dt_birth_datedrop': '02-01-2006',
    'dt_birth_timedrop': '',
    'dontknow': 'on',
    'dt_birth_town': 'תל+אביב,+Tel+Aviv,+Israel,+34.78057,+32.08088,+2',
    'formSubmit': 'בנה+מפה'
  }).toString(),
})
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const imgElement = doc.querySelector('img');
    const src = imgElement ? imgElement.getAttribute('src') : null;
    console.log(src);
  })
  .catch(error => console.error(error));