const path = require('path');
const Web3 = require("web3");

const product_abi = require(path.resolve("../dapp/build/contracts/BolaoEsportivo.json"));
const httpEndpoint = 'http://localhost:8540';

let contractAddress = require('../../utils/parityRequests').contractAddress;

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};

let web3 = new Web3(httpEndpoint, null, OPTIONS);

let MyContract = new web3.eth.Contract(product_abi.abi, contractAddress);

function renderGetDadosSorteio(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getDadosSorteio.html');
    }
}

function renderGetBalanceBolao(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getBalanceBolao.html');
    }
}

function renderGetBalanceApostador(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getBalanceApostador.html');
    }
}

function renderAddAposta(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('registrarAposta.html');
    }
}

function renderGetAposta(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getAposta.html');
    }
}

function renderPutAposta(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('putAposta.html');
    }
}

function renderPutBolao(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('putBolao.html');
    }
}

function renderGetValorAposta(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getValorAposta.html');
    }
}

function renderGetQuantidadeApostas(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getQuantidadeApostas.html');
    }
}

function renderGetValorPremioAcumulado(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getValorPremioAcumulado.html');
    }
}

function renderGetQuantidadeExigidaApostadores(req, res) {
    // verifica se usuario esta logado
    if (!req.session.username) {
        res.redirect('/api/auth');
        res.end();
    } else {
        res.render('getQuantidadeExigidaApostadores.html');
    }
}

async function quantidadeExigidaApostadores(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting quantidadeExigidaApostadores ***", userAddr);
    await MyContract.methods.getQuantidadeExigidaApostadores()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (qtd) {
            if (qtd === null) {
                return res.send({ error: false, msg: "Quantidade exigida de apostadores não encontrada" });
            }
            let quantidade = { 'qtd': + qtd }
            res.send({ error: false, msg: "Quantidade exigida de apostadores com sucesso", quantidade });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> quantidadeExigidaApostadores ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function quantidadeApostas(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting quantidadeApostas ***", userAddr);
    await MyContract.methods.getQuantidadeApostas()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (qtd) {
            if (qtd === null) {
                return res.send({ error: false, msg: "Nenhuma aposta encontrada" });
            }
            let quantidade = { 'qtd': + qtd }
            res.send({ error: false, msg: "Quantidade de apostas encontradas com sucesso", quantidade });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> quantidadeApostas ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function valorAposta(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting valorAposta ***", userAddr);
    await MyContract.methods.getValorAposta()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (vlr) {
            if (vlr === null) {
                return res.send({ error: false, msg: "Valor da aposta não encontrada" });
            }
            let valor = { 'vlr': + vlr }
            res.send({ error: false, msg: "Valor da aposta encontrada com sucesso", valor });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> valorAposta ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function valorPremioAcumulado(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting valorPremioAcumulado ***", userAddr);
    await MyContract.methods.getValorPremioAcumulado()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (vlr) {
            if (vlr === null) {
                return res.send({ error: false, msg: "Valor do premio acumulado não encontrado" });
            }
            let valor = { 'vlr': + vlr }
            res.send({ error: false, msg: "Valor do premio acumulado encontrado com sucesso", valor });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> valorPremioAcumulado ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function apostar(req, res) {
    if (!req.session.username) {
        res.redirect('/');
        res.end();
    } else {
        let userAddr = req.session.address;
        let pass = req.session.password;
        let aposta = req.body.aposta;
        console.log("apis -> bolao -> apostar: ", userAddr);
        try {
            let accountUnlocked = await web3.eth.personal.unlockAccount(userAddr, pass, null)
            console.log("Account unlocked?", accountUnlocked);
            if (accountUnlocked) {
                console.log(contractAddress)
                console.log("*** registrar aposta ***", userAddr);
                await MyContract.methods.registrarAposta(aposta)
                    .send({ from: userAddr, gas: 3000000, value: 1000000000000000000 })
                    .then(function (result) {
                        return res.send({ 'error': false, 'msg': 'Aposta cadastrada com sucesso.' });
                    })
                    .catch(function (err) {
                        return res.send({ 'error': true, 'msg': 'Não foi possível registrar a sua aposta.' });
                    })
            }
        } catch (error) {
            return res.send({ 'error': true, 'msg': 'Erro ao desbloquear sua conta. Por favor, tente novamente mais tarde.' });
        }
    }
}

async function detalharAposta(req, res) {
    if (!req.session.username) {
        res.redirect('/');
        res.end();
    } else {
        let userAddr = req.session.address;
        let pass = req.session.password;
        let aposta = req.body.aposta;
        console.log("apis -> bolao -> apostar: ", userAddr);
        try {
            let accountUnlocked = await web3.eth.personal.unlockAccount(userAddr, pass, null)
            console.log("Account unlocked?", accountUnlocked);
            if (accountUnlocked) {
                console.log(contractAddress)
                console.log("*** Getting detalharAposta ***", userAddr);
                await MyContract.methods.detalharAposta()
                    .call({ from: userAddr, gas: 3000000 })
                    .then(function (vlr) {
                        let valor = { 'vlr': + vlr }
                        if (vlr == 0) {
                            res.send({ error: false, msg: "Você, ainda, não tem uma aposta registrada. Por favor, faça a sua aposta!", valor });
                        } else {
                            res.send({ error: false, msg: "Aposta encontrada com sucesso", valor });
                        }
                        return true;
                    })
                    .catch(error => {
                        console.log("*** bolaoApi -> detalharAposta ***error:", error);
                        res.send({ error: true, msg: error });
                    })
            }
        } catch (error) {
            return res.send({ 'error': true, 'msg': 'Erro ao desbloquear sua conta. Por favor, tente novamente mais tarde.' });
        }
    }
}

async function devolverAposta(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** devolverAposta ***", userAddr);
    await MyContract.methods.devolverAposta()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (result) {
           res.send({ error: false, msg: "Aposta devolvida com sucesso" });
        })
        .catch(error => {
            res.send({ error: true, msg: "Você não tem uma aposta registrada ou o bolão encontra-se fechado para devoluções" });
        })
}

async function encerrarBolao(req, res) {
    if (!req.session.username) {
        res.redirect('/');
        res.end();
    } else {
        let userAddr = req.session.address;
        let pass = req.session.password;
        console.log("apis -> bolao -> encerrarBolao: ", userAddr);
        try {
            let accountUnlocked = await web3.eth.personal.unlockAccount(userAddr, pass, null)
            console.log("Account unlocked?", accountUnlocked);
            if (accountUnlocked) {
                console.log(contractAddress)
                let userAddr = req.session.address;
                console.log("*** encerrar bolao ***", userAddr);
                await MyContract.methods.encerrarBolao()
                    .send({ from: userAddr, gas: 3000000 })
                    .then(function (result) {
                        return res.send({ 'error': false, 'msg': 'Bolao encerrado com sucesso.' });
                    })
                    .catch(function (err) {
                        return res.send({ 'error': true, 'msg': 'Erro ao comunicar com o contrato.' });
                    })
            }
        } catch (error) {
            return res.send({ 'error': true, 'msg': 'Erro ao desbloquear sua conta. Por favor, tente novamente mais tarde.' });
        }
    }
}

async function balanceApostador(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting getBalanceApostador ***", userAddr);
    await MyContract.methods.getBalanceApostador()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (qtd) {
            console.log(qtd)
            if (qtd === null) {
                return res.send({ error: false, msg: "Balance apostador não encontrado" });
            }
            let quantidade = { 'qtd': + qtd }
            res.send({ error: false, msg: "Balance apostador encontrado com sucesso", quantidade });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> balanceApostador ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function balanceBolao(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting getBalanceBalao ***", userAddr);
    await MyContract.methods.getBalanceContrato()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (qtd) {
            console.log(qtd)
            if (qtd === null) {
                return res.send({ error: false, msg: "Balance do bolão não encontrado" });
            }
            let quantidade = { 'qtd': + qtd }
            res.send({ error: false, msg: "Balance do bolão encontrado com sucesso", quantidade });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> balanceBolao ***error:", error);
            res.send({ error: true, msg: error });
        })
}

async function dadosSorteio(req, res) {
    console.log(contractAddress)
    let userAddr = req.session.address;
    console.log("*** Getting getSorteio ***", userAddr);
    await MyContract.methods.getUltimoSorteio()
        .call({ from: userAddr, gas: 3000000 })
        .then(function (ret) {
            console.log(ret)
            if (ret === null) {
                return res.send({ error: false, msg: "Dados do último sorteio não encontrado" });
            }
            res.send({ error: false, msg: "Dados do último sorteio encontrado com sucesso", dadosSorteio: { data: ret[0], numeroSorteado:  ret[1], sorteador:  ret[2], quantidadeApostas:  ret[3], quantidadeGanhadores:  ret[4], valorPremioTotal:  ret[5], valorPremioResiduo:  ret[6], } });
            return true;
        })
        .catch(error => {
            console.log("*** bolaoApi -> getSorteio ***error:", error);
            res.send({ error: true, msg: error });
        })
}

module.exports = {
    renderAddAposta,
    renderGetAposta,
    renderPutAposta,
    renderPutBolao,
    renderGetValorAposta,
    renderGetValorPremioAcumulado,
    renderGetQuantidadeApostas,
    renderGetQuantidadeExigidaApostadores,
    valorAposta,
    valorPremioAcumulado,
    quantidadeApostas,
    quantidadeExigidaApostadores,
    apostar,
    detalharAposta,
    devolverAposta,
    encerrarBolao,
    renderGetBalanceBolao,
    renderGetBalanceApostador,
    balanceBolao,
    balanceApostador,
    renderGetDadosSorteio,
    dadosSorteio
}