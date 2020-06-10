# dappBolaoEntreAmigos
Smart Contract que, quando executado, implementa um bolão esportivo entre amigos. 

Dependências necessárias
Os softwares necessários para rodar o app são:

Nodejs/npm: https://nodejs.org/en/
Truffle Framework (Para fazer deploy e testes do smart contract)
Curl https://curl.haxx.se/ (Para enviar requisições ao parity pelo terminal)
Parity https://wiki.parity.io/Setup (Linux / Mac)
Parity https://github.com/paritytech/parity-ethereum/releases (Windows)
Após instalar o Nodejs:

-> npm install -g truffle
Para usuários Windows, execute o shell como administrador

npm install --global windows-build-tools --unsafe
Instruções
Para rodar a blockchain
dentro da pasta blockchain

Execute o seguinte comando:

parity --config nodes/node00/node.toml 
Em um outro terminal, execute os seguintes comandos:

curl --data '{"method":"parity_newAccountFromPhrase","params":["node00","node00"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8540
O comando acima retornará um endereço da conta criada, copie este endereço pois o usaremos nos próximos passos.
Para que o parity reconheça a conta pelo seu nome, use o comando abaixo:

curl --data '{"method":"parity_setAccountName","params":["0x00a1103c941fc2e1ef8177e6d9cc4657643f274b","node00"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8540
Crie uma conta de usuário (não validador):

curl --data '{"method":"parity_newAccountFromPhrase","params":["user","user"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8540
curl --data '{"method":"parity_setAccountName","params":["0x004ec07d2329997267ec62b4166639513386f32e","user"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8540
Pare a execução do nó. Descomente o código no arquivo /nodes/node00/node.toml

Execute o nó com o comando:

parity --config nodes/node00/node.toml
Para fazer o deploy do contrato
Agora que a blockchain esta rodando, em um outro terminal, entre na pasta dapp. Para fazer o deploy do contrato basta executar:

truffle migrate --reset
Pare a execução do nó. Execute o nó com o comando:

parity --config nodes/node00/node.toml
Para executar o app
Dentro da pasta webapp

npm install
npm start
Para fazer login:
user: user
senha: user
