# Lost and Found APP - Frontend
## Descrição
Este é o projeto frontend para a aplicação Lost and Found APP. Desenvolvido com React e TypeScript, ele fornece a interface de utilizador para interagir com o backend, permitindo a gestão de itens perdidos e achados.

A interface está dividida em duas áreas principais: uma área pública para visualização de itens perdidos e uma área privada, acessível após login, para utilizadores autorizados (ADMIN, VIGILANTE) poderem gerir os itens, registar novos achados e processar devoluções.

Funcionalidades Principais
Autenticação de Utilizadores: Ecrã de login seguro para aceder à área privada da aplicação.

Catálogo Público: Uma página inicial que exibe uma lista de itens recentemente encontrados, acessível a todos os visitantes.

Gestão de Itens (Área Privada):

Listagem completa e paginada de todos os itens registados (perdidos e entregues).

Criação de novos registos de itens perdidos, incluindo a opção de fazer upload de uma imagem.

Edição de informações de itens já existentes.

Visualização detalhada de um item específico.

### Processo de Entrega:

Um formulário dedicado para registar a entrega de um item ao seu proprietário, com campos de confirmação.

Listagem de todos os itens que já foram entregues.

Controlo de Acesso por Papel: A interface adapta-se dinamicamente às permissões do utilizador logado, mostrando ou ocultando funcionalidades (como botões de "Novo Item" ou "Admin") com base nos papéis (ROLE_ADMIN, ROLE_VIGILANTE).

Design Responsivo: Componentes e layouts desenhados para funcionar em diferentes tamanhos de ecrã.

## Ferramentas e Tecnologias
<img loading="lazy" src="https://github.com/thiagorabaioli/assets/blob/main/img/js.png" width="40" height="40"/> <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="40" height="40"/> <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" height="40"/>
<img loading="lazy" src="https://github.com/thiagorabaioli/assets/blob/main/img/react.png" width="40" height="40"/> 
<img loading="lazy" src="https://github.com/thiagorabaioli/assets/blob/main/img/ts.png" width="40" height="40"/> 
<img loading="lazy" src="https://github.com/thiagorabaioli/assets/blob/main/img/yarn.png" width="80" height="80"/>


## Contatos:
<div>

<a href="https://www.twitch.tv/seu-usuário-aqui" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" target="_blank"></a>
<a href = "mailto:tf"><img loading="lazy" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/rabaioli37" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
</div>
Tecnologias Utilizadas
Framework/Biblioteca Principal: React 18.2.0

Linguagem: TypeScript

Ferramenta de Build: Vite

Roteamento: React Router DOM 6.4.1

Requisições HTTP: Axios

Estilização: CSS puro com variáveis

Gestão de Estado: React Context API para controlo de autenticação.

Como Começar
Siga estas instruções para configurar e executar o projeto no seu ambiente local.

Pré-requisitos
Node.js (versão 16 ou superior)

Yarn (ou npm)

O backend do Lost and Found APP deve estar em execução.

Instalação e Configuração
Clone o repositório:

Bash
```
git clone https://github.com/thiagorabaioli/frontend-lostandofund.git
cd frontend-lostandofund
Instale as dependências:
```
Bash
```
yarn install
ou, se utilizar npm:
```
Bash
```
npm install
Configuração do Ambiente:
```
Crie um ficheiro .env na raiz do projeto.

Adicione as seguintes variáveis de ambiente a este ficheiro, ajustando o URL do backend se necessário:

Fragmento do código

VITE_BACKEND_URL=http://localhost:8080
VITE_CLIENT_ID=myclientid
VITE_CLIENT_SECRET=myclientsecret
VITE_IMGBB_API_KEY=sua_chave_api_do_imgbb
Nota: A aplicação está configurada para fazer upload de imagens para o serviço ImgBB. É necessário criar uma conta e obter uma chave de API para que o upload de imagens funcione no formulário de criação de itens.

Executar a Aplicação
Para iniciar o servidor de desenvolvimento, execute:

Bash
```
yarn dev
```
ou

Bash
```
npm run dev
```
A aplicação estará disponível em http://localhost:5173 (ou outra porta indicada pelo Vite).
