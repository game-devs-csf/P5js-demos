"use strict"

import express from 'express'
import fs from 'fs'

const app = express()
const port = 5000

// Since we are using the chart module installed from node js, we need to expose it so that the web page can use it.
app.use(express.static('./public'))

app.get('/', (request, response)=>{
    fs.readFile('public/html/index.html', 'utf8', (err, html)=>{
        if(err) response.status(500).send('There was an error: ' + err)
        console.log('Loading page...')
        response.send(html)
    })
})

app.listen(port, ()=>
{
    console.log(`App listening at http://localhost:${port}`)
})