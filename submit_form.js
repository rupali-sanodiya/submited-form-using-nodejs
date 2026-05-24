const http = require('http');

http.createServer((req, res) => {
    // Styling HTML structure
    const baseHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Form</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f4f9; margin: 0; }
            .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
            input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
            button { width: 100%; padding: 12px; background-color: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 10px; }
            button:hover { background-color: #218838; }
            .success { color: #28a745; margin-bottom: 20px; }
            .data-info { text-align: left; background: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
            a { text-decoration: none; color: #007bff; }
        </style>
    </head>
    <body>
    `;

    // 1. Home Page 
    if (req.url === '/') {
        res.writeHead(200, { "content-type": 'text/html' });
        res.write(baseHTML + `
            <div class="card">
                <h2>Create Account</h2>
                <form action="/submit" method="POST">
                    <input type="text" placeholder="Enter Full Name" name="name" required/>
                    <input type="email" placeholder="Enter Email Address" name="email" required/>
                    <button type="submit">Submit Data</button>
                </form>
            </div>
            </body></html>`);
        res.end();
    } 
    
    // 2. Submit Data 
    else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = new URLSearchParams(body);
            res.writeHead(200, { "content-type": 'text/html' });
            res.write(baseHTML + `
                <div class="card">
                    <h1 class="success">✓ Success!</h1>
                    <p>Your Data has been submitted successfully:</p>
                    <div class="data-info">
                        <p><strong>Name:</strong> ${data.get('name')}</p>
                        <p><strong>Email:</strong> ${data.get('email')}</p>
                    </div>
                    <a href="/">← Go Back to Form</a>
                </div>
                </body></html>`);
            res.end();
        });
    }
}).listen(3200, () => {
    console.log("show on server: http://localhost:3200");
});