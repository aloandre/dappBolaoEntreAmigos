pragma solidity ^0.5.0;

contract BolaoEsportivo {
    address  _dono;
    uint256  _inicio;
    uint8  _quantidadeExigidaApostadores = 2;
    uint256  _valorPremioAcumulado;
    uint256  _valorAposta = 1000000000000000000;
    uint quantidadePossibilidades = 2;

    struct User {
        string email;
    }

    struct Sorteio {
        uint256 _data;
        uint256 _numeroSorteado;
        address _sorteador;
        uint256 _quantidadeApostas;
        uint256 _quantidadeGanhadores;
        uint256 _valorPremioTotal;
        uint256 _valorPremioResiduo;
    }
    
    Sorteio[]  _sorteios;
    
    mapping (address => uint256) _apostas;
    address payable[] _apostadores;
    address payable[] _ganhadores;

    mapping (address => User) users;

    event userRegisted(address _addr, string newEmail);
    event TrocoEnviado(address pagante, uint256 troco);
    event ApostaRegistrada(address remetente, uint256 aposta);
    event ApostaDevolvida(address remetente, uint256 aposta);
    event ApostaNaoDevolvida(address remetente, uint256 aposta, string mensagem);
    event bolaoEncerrado(uint256 quantidadeGanhadores, uint256 valorPremioTotal, uint256 valorPremioResiduo);
    event sorteioPostado(uint256 resultado);
    event PremiosEnviados(uint256 premioTotal, uint256 premioIndividual);
    event PremiosEnviado(address remetente, uint256 premioIndividual);
    event PremioAcumulado(uint256 premioTotal);

    constructor() public {
        _dono = msg.sender;
        _inicio = now;
    }

    function setUser(address _addr, string memory _email) public {
        User storage user = users[_addr];
        user.email = _email;
        emit userRegisted(_addr, "Conta registrada com sucesso!");
    }

    function getUser(address _addr) public view returns(string memory) {
        User memory user = users[_addr];
        return (user.email);
    }
    
    function registrarAposta(uint256 aposta) payable public {
        require (_apostadores.length < _quantidadeExigidaApostadores, "Não foi possível registrar a sua aposta. O bolão esportivo encontra-se fechado");
        require (aposta >= 1 && aposta <=2, "Você tem que escolher um número entre 1 e 2");
        require (_apostas[msg.sender] == 0, "Apenas uma aposta poderá ser enviada por sorteio");
        require (msg.value >= _valorAposta, "A taxa para apostar é de 1 IESBEther");

        uint256 troco = msg.value - _valorAposta;
        
        if (troco > 0) {
            msg.sender.transfer(troco);
            emit TrocoEnviado(msg.sender, troco);
        }
        
        _apostas[msg.sender] = aposta;
        _apostadores.push(msg.sender);
        
        emit ApostaRegistrada(msg.sender, aposta);
    }

    function detalharAposta() view public returns(uint256) {
        if(_apostas[msg.sender] > 0)
            return _apostas[msg.sender];
        else
            return 0;
    }

    function devolverAposta() public {
        require (_apostas[msg.sender] > 0, "Você não tem uma aposta registrada");
        require (_apostadores.length < _quantidadeExigidaApostadores, "Não foi possível devolver a sua aposta. O bolão esportivo encontra-se fechado para devoluções");
        
        for(uint8 p=0; p < _apostadores.length; p++) {
            address apostador = _apostadores[p];
            if (apostador == msg.sender) {
                _apostadores[p] = _apostadores[_apostadores.length - 1];
                _apostadores.pop();            
                delete _apostas[msg.sender];
                msg.sender.transfer(_valorAposta);
                emit ApostaDevolvida(msg.sender, _apostas[msg.sender]);
                break;
            }
        }
    }
    
    function getBalanceContrato() view public returns(uint256) {
        return address(this).balance;
    }    

    function getBalanceApostador() view public returns(uint256) {
        return address(msg.sender).balance;
    }    

    function getValorAposta() view public returns(uint256) {
        return _valorAposta;
    }    

    function getValorPremioAcumulado() view public returns(uint256) {
        return _valorPremioAcumulado;
    }    

    function getQuantidadeExigidaApostadores() view public returns(uint8) {
        return _quantidadeExigidaApostadores;
    }  
    
    function getQuantidadeSorteios() view public returns(uint256) {
        return _sorteios.length;
    }  
    
    function getSorteio(uint _id) public view returns (uint256 _data, uint256 _numeroSorteado, address _sorteador, uint256 _quantidadeApostas, uint256 _quantidadeGanhadores, uint256 _valorPremioTotal, uint256 _valorPremioResiduo) {
        Sorteio memory sorteio = _sorteios[_id];
        return (sorteio._data, sorteio._numeroSorteado, sorteio._sorteador, sorteio._quantidadeApostas, sorteio._quantidadeGanhadores, sorteio._valorPremioTotal, sorteio._valorPremioResiduo);
    }

    function getUltimoSorteio() public view returns (uint256 _data, uint256 _numeroSorteado, address _sorteador, uint256 _quantidadeApostas, uint256 _quantidadeGanhadores, uint256 _valorPremioTotal, uint256 _valorPremioResiduo) {
       require (_sorteios.length > 0, "Nenhum sorteio disponível para consulta");
         
       Sorteio memory sorteio = _sorteios[_sorteios.length-1];
       return (sorteio._data, sorteio._numeroSorteado, sorteio._sorteador, sorteio._quantidadeApostas, sorteio._quantidadeGanhadores, sorteio._valorPremioTotal, sorteio._valorPremioResiduo);
    }

    function getQuantidadeApostas() view public returns(uint256) {
        if(_apostadores.length > 0)
            return _apostadores.length;
        else
            return 0;
    }    

    function getNumeroSorteado() view private returns(uint256) {
        uint numeroSorteado = uint(blockhash(block.number-1))%quantidadePossibilidades + 1;
        
        if(numeroSorteado != 0)
            return numeroSorteado;
        else
            return 0;
    }    

    function encerrarBolao() public {
        require(_apostadores.length >= _quantidadeExigidaApostadores, "Não foi possível encerrar. O bolão esportivo, ainda, encontra-se aberto para apostas");

        uint256 numeroSorteado = getNumeroSorteado();
        emit sorteioPostado(numeroSorteado);
        
        for(uint8 p=0; p < _apostadores.length; p++) {
            address apostador = _apostadores[p];
            if (_apostas[apostador] == numeroSorteado) {
                _ganhadores.push(_apostadores[p]);
            }
            delete _apostas[apostador];
        }
        
        uint256 valorPremioTotal = (_valorPremioAcumulado + (_apostadores.length * _valorAposta));
        uint256 valorPremioResiduo = 0;
       
        if (_ganhadores.length <= 0) {
            _valorPremioAcumulado = valorPremioTotal;
            emit PremioAcumulado(_valorPremioAcumulado);
        } else {
            valorPremioResiduo = valorPremioTotal % _ganhadores.length;
            uint256 valorPremioIndividual = ((valorPremioTotal - valorPremioResiduo) / _ganhadores.length);
            _valorPremioAcumulado = valorPremioResiduo;
            
            for(uint8 p=0; p < _ganhadores.length; p++) {
                address payable ganhador = _ganhadores[p];
                delete _ganhadores[p];
                ganhador.transfer(valorPremioIndividual);
                emit PremiosEnviado(ganhador, valorPremioIndividual);
            }
            
            emit PremiosEnviados(valorPremioTotal, valorPremioIndividual);
        }

        _sorteios.push(Sorteio({
            _data: now,
            _numeroSorteado: numeroSorteado,
            _sorteador: msg.sender,
            _quantidadeApostas: _apostadores.length,
            _quantidadeGanhadores: _ganhadores.length,
            _valorPremioTotal:valorPremioTotal,
            _valorPremioResiduo: valorPremioResiduo
        }));
        
        emit bolaoEncerrado(_ganhadores.length, valorPremioTotal, valorPremioResiduo);

        delete _apostadores;
        delete _ganhadores;
     }
}