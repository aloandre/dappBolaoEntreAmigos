const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const bolao = require("./apis/bolao/bolao.js");

// set default views folder
app.set('views', __dirname + "/views");
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// registra a sessão do usuário
app.use(session({
    secret: 'mysecret',
    saveUninitialized: false,
    resave: false
}));

const authRoutes = require('./apis/routes/auth.js');

app.get('/', (req, res) => {
    res.redirect('/api/auth');
});

// * Auth pages * //
app.use("/api/auth", authRoutes);

// * Aposta pages * //
app.get("/addAposta", bolao.renderAddAposta);
app.post("/apostar", bolao.apostar);

app.get("/getAposta", bolao.renderGetAposta);
app.get("/detalharAposta", bolao.detalharAposta);

app.get("/putAposta", bolao.renderPutAposta);
app.get("/devolverAposta", bolao.devolverAposta);

app.get("/putBolao", bolao.renderPutBolao);
app.get("/encerrarBolao", bolao.encerrarBolao);

app.get("/getBalanceBolao", bolao.renderGetBalanceBolao);
app.get("/balanceBolao", bolao.balanceBolao);

app.get("/getBalanceApostador", bolao.renderGetBalanceApostador);
app.get("/balanceApostador", bolao.balanceApostador);

app.get("/getValorAposta", bolao.renderGetValorAposta);
app.get("/valorAposta", bolao.valorAposta);

app.get("/getQuantidadeApostas", bolao.renderGetQuantidadeApostas);
app.get("/quantidadeApostas", bolao.quantidadeApostas);

app.get("/getValorPremioAcumulado", bolao.renderGetValorPremioAcumulado);
app.get("/valorPremioAcumulado", bolao.valorPremioAcumulado);

app.get("/getQuantidadeExigidaApostadores", bolao.renderGetQuantidadeExigidaApostadores);
app.get("/quantidadeExigidaApostadores", bolao.quantidadeExigidaApostadores);

app.get("/getDadosSorteio", bolao.renderGetDadosSorteio);
app.get("/dadosSorteio", bolao.dadosSorteio);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`);
})