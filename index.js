import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";



const app = express();

const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

var userAuth = false;

function solChecker(req, res, next) {
    const password = req.body["password"];
    const userName = req.body["userid"];
    if (password === "485002" && userName === "Tuna4650") {
        userAuth = true;
    }
    else {
        userAuth = false;
    }
    next();
};

app.use(solChecker);

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", { hata: "" });
});

app.post("/check", (req, res) => {
    if (userAuth === true) {
        res.render(__dirname + "/views/secret.ejs");
    }
    else {
        res.render(__dirname + "/views/index.ejs", {
            hata: "yanlış şifre tekrar deneyin."
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
