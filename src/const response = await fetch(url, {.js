const response = await fetch(url, { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: Json.stringify(data)
});
const response.json();