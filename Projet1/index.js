import express from 'express'
import formidable from 'formidable'

import { fileURLToPath } from 'url'
import { dirname, parse, sep } from 'path'


const __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
    port: process.env.PORT || 3000,
    dir: {
        root: __dirname,
        uploads: __dirname + 'uploads' + sep
    }
}

const app = express();

app.use(express.static(cfg.dir.uploads))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))

// app.get('/get-form', (req, res) => {
//     res.render('form', {
//         title: 'Analyser les données HTTP GET',
//         data: req.body
//     })
// })

// app.get('/post-form', (req, res) => {
//     res.render('form-post', {
//         title: 'HTTP Request POST',
//         data: req.body
//     })
// })

// app.post('/post-form', (req, res) => {
//     res.render('form-post', {
//         title: 'HTTP Request POST',
//         data: req.body
//     })
// })

app.all('/', (req, res, next) => {
    if (req.method === 'GET' || req.method === 'POST') {
        //formidable
        const form = formidable({
            uploadDir: cfg.dir.uploads,
            keepExtensions: true
        });

        form.parse(req, (err, data, files) => {
            if (err) {
                next(err);
                return;
            }
            if (files && files.image && files.image.size > 0) {
                data.filename = files.image.orginalFilename
                data.filetype = files.image.mimetype
                data.filesize = Math.ceil(files.image.size / 1024) + 'KB'
                data.uploadto = files.image.filepath
                data.imageurl = '/' + parse(files.image.filepath).base
            }
            res.render('form', {
                title: 'Parse Data POST file',
                data: data
            })
        })

    } else {
        next()
    }
})

app.listen(cfg.port, () => {
    console.log(`App ready at http://localhost:${cfg.port}`)
})