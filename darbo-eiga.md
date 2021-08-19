Sio projekto darbo eiga
---- preparation ----
1)Pradejom,  nuo npm init -y, irasem i package json i script daly, kad iskvieciant komanda "npm start", vsc paleistu "run.js". Taip pat po "main" nurodem, kad type: module.
1.1) atsisiuntem moduli express, is npm
1.2) pagal modulio aprasyma, padarem bazinius dalykus(import'as, app.get, app.listen)
---- preparation end ----

---- simplest server start ----
2) Sukurem direktorija "web", ir prirasem jai kintamaji "WEB_DIR", ir "app.use(express.static)" komanda visada prades nuo statiniu html'u skaitymo.
 Po to, kai surasem bazinius dalykus, pabandem paleisti servery, viskas veikia. "app.use(express.static" nurodem parametra "index:false", nes pagal default jis yra "true", ir paledziant serveri, jis skaitys "index.html" faila.