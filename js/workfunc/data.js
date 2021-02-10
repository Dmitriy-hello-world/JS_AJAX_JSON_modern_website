async function postData(url,body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: body
    });

    return response.json(); 
}

export {postData};