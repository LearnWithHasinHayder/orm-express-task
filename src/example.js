import express from 'express'

const app = express()

app.use(express.urlencoded())

app.get('/',(req, res)=>{
    res.send("Welcome to Express!!!")
})

app.get("/greet/:name", (req,res)=>{
    const name = req.params.name
    // const title = req.query.title || "Mr"
    const {title} = req.query

    // res.send(`<h1>Hello ${name}</h1>`)
    res.json({
        name, 
        title: title || "Mr"
    })
})

app.get("/form",(req, res)=>{
    res.send(`
        <html>
        <head>
            <title>Simple Form</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 50px auto; padding: 20px; }
                form { display: flex; flex-direction: column; gap: 10px; }
                input, button { padding: 8px; font-size: 16px; }
                button { background: #007bff; color: white; border: none; cursor: pointer; }
                button:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <h2>Simple Form</h2>
            <form method="POST" action="/submit">
                <input type="text" name="name" placeholder="Enter your name" required>
                <input type="email" name="email" placeholder="Enter your email" required>
                <input type="text" name="message" placeholder="Enter a message">
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `)
})

app.post('/submit',(req,res)=>{
    const {name, email, message}= req.body
    // res.json({
    //     name, email, message
    // })
    res.send(`
        <html>
        <head>
            <title>Form Submitted</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 50px auto; padding: 20px; }
                .data { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0; }
                .back-link { display: inline-block; margin-top: 20px; color: #007bff; text-decoration: none; }
                .back-link:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h2>Form Submitted Successfully!</h2>
            <div class="data">
                <strong>Name:</strong> ${name || 'Not provided'}<br>
                <strong>Email:</strong> ${email || 'Not provided'}<br>
                <strong>Message:</strong> ${message || 'Not provided'}
            </div>
            <a href="/form" class="back-link">← Back to Form</a>
        </body>
        </html>
    `);
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
    console.log("Running...")
})