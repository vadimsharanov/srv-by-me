import express from "express";
import exphbs from "express-handlebars";
import { readFile, writeFile } from "fs/promises";

const PORT = 3000;
const  WEB_DIR = "web";
const DB_FILE = "zmones.json"

const  app = express();
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars")

app.use(express.static(WEB_DIR, { // https://expressjs.com/ru/api.html
    index:false
}));
app.use(express.urlencoded(
    {extended: true}
));
app.use(express.json());


app.get("/", async (req, res) => {
    try {
        let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
        zmones = JSON.parse(zmones);
        res.render("zmones", {
        zmones,
        title:"Pilnas zmoniu sarasas"})
    }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`)
    }
});

app.get("/zmogus/:id?", async (req, res) => {
    try {
        let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
        zmones = JSON.parse(zmones);
        let id, zmogus;
        id = req.params.id;
        zmogus = zmones.find(z => z.id === id);
        res.render("zmogus", {
        zmogus,
        title:"Informacija apie zmogu"})
    }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`)
    }
})
app.post("/", async (req,res) => {
    try { 
        if (req.body.id) {
            let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
            zmones = JSON.parse(zmones);
            let id, zmogus;
            id = req.body.id;
            zmogus = zmones.find(z => z.id === id);
            if (zmogus) {
                zmogus.vardas = req.body.newName;
                zmogus.pavarde = req.body.newLastName;
                zmogus.alga = req.body.newSalary;
            }
            else {
                res.render("nera", {
                    zmogus,
                    id
                })
                return ;
            }
            await writeFile(DB_FILE, JSON.stringify(zmones, null, 2, {
                encoding:"utf-8"
            }))
            res.redirect("/")
    
        }

        else {
            let zmones = await readFile(DB_FILE, {
                encoding:"utf-8"
            })
                zmones = JSON.parse(zmones);

            let nextId = 0;
            for (const zmogus of zmones) {
                if( zmogus.id > nextId) {
                    nextId = parseInt(zmogus.id);
                }
            }
            nextId++;
            const zmogus = {
                id: `${nextId}`,
                vardas:req.body.newName,
                pavarde:req.body.newLastName,
                alga:(req.body.newSalary)
            }
            zmones.push(zmogus);
            await writeFile(DB_FILE, JSON.stringify(zmones,null, 2, {
                encoding:"utf-8"
            }))
            res.redirect("/")
        }
        }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`)
    }
});

app.get("/zmogus/delete/:id", async (req, res) => {
    try {
        let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
        zmones = JSON.parse(zmones);
        let id, zmogus;
        id = req.params.id;
        zmogus = zmones.findIndex(z => z.id === id);
        zmones.splice(zmogus, 1)
        await writeFile(DB_FILE, JSON.stringify(zmones, null, 2, {
            encoding:"utf-8"
        }))
        res.redirect("/")
    }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`)
    }
})


app.get("/json/zmogus", async (req, res) => {
    try {
        let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
        zmones = JSON.parse(zmones);
        res.set("Content-Type", "application/json"); // kai siusiu atgal respons'a, kad jis header'i content type nustatytu i application json
        res.send(JSON.stringify(zmones));
    }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`);
    }
})

app.post("/json/zmogus", async (req, res) => {
    try { 
        if (req.body.id) {
            let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
            zmones = JSON.parse(zmones);
            let id, zmogus;
            id = req.body.id;
            zmogus = zmones.find(z => z.id === id);
            if (zmogus) {
                zmogus.vardas = req.body.newName;
                zmogus.pavarde = req.body.newLastName;
                zmogus.alga = req.body.newSalary;
            }
            else {
                res.render("nera", {
                    zmogus,
                    id
                })
                return ;
            }
            await writeFile(DB_FILE, JSON.stringify(zmones, null, 2, {
                encoding:"utf-8"
            }))
            res.redirect("/")
    
        }

        else {
            let zmones = await readFile(DB_FILE, {
                encoding:"utf-8"
            })
                zmones = JSON.parse(zmones);

            let nextId = 0;
            for (const zmogus of zmones) {
                if( zmogus.id > nextId) {
                    nextId = parseInt(zmogus.id);
                }
            }
            nextId++;
            const zmogus = {
                id: `${nextId}`,
                vardas:req.body.newName,
                pavarde:req.body.newLastName,
                alga:(req.body.newSalary)
            }
            console.log(zmogus);
            zmones.push(zmogus);
            await writeFile(DB_FILE, JSON.stringify(zmones,null, 2, {
                encoding:"utf-8"
            }))
        }
        res.status(201).end()
        }
    catch (err) {
        res.status(500).end(`<html> ivyko klaida ${err.message}</html>`)
    }
})

app.delete("/json/zmogus/:id", async (req, res) => {
    try {
        let zmones = await readFile(DB_FILE, {
            encoding:"utf-8"
        })
        zmones = JSON.parse(zmones);
        let id, zmogus;
        id = req.params.id;
        zmogus = zmones.findIndex(z => z.id === id);
        zmones.splice(zmogus, 1)
        await writeFile(DB_FILE, JSON.stringify(zmones, null, 2), {
            encoding:"utf-8"
        })
        res.status(200).end();
    }
    catch (err) {
        res.status(500).end(
            `<html> ivyko klaida ${err.message}</html>`);
    }
})
app.listen(PORT);

console.log(`Server started on port ${PORT}`);