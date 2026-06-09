# ✦ ` Portfólio Pessoal`

<img src="img/logo.png" alt="Logo Julia" width="250px"/>

> Este é um projeto de portfólio pessoal A aplicação centraliza meus projetos comerciais e acadêmicos, atuando como um laboratório contínuo de experimentação em engenharia de software frontend, UI/UX e otimização de performance.

A plataforma substitui o formato tradicional de currículo por uma experiência interativa e imersiva baseada em janelas e terminais virtuais. Desenvolvida focando em identidade visual marcante e modularidade estrutural, a aplicação expõe minhas competências técnicas através de um ecossistema frontend limpo, performático e totalmente responsivo.

---

## 💡 `Sobre a Plataforma`

A arquitetura do projeto foi projetada para unificar uma estética retrô marcante com práticas modernas de desenvolvimento de interfaces. O sistema foi estruturado para mitigar gargalos comuns de layouts complexos através de:

* **Estilização:** Interface construída com sombras rígidas, bordas em bloco e tipografia pixelada.
* **Motor de Texturização Dupla:** Aplicação de ruído procedural via SVG filtrado em tempo real (`feTurbulence`) combinado a gradientes estáticos, simulando telas de monitores de tubo (CRT) e fibras de papel sem sobrecarregar o hardware do cliente.
* **Mecanismo de Escopo Isolado:** Arquitetura CSS limpa e reestruturada logicamente, prevenindo vazamentos de escopo em regras de responsividade (`@media queries`) e garantindo consistência visual entre desktop e mobile.
* **Persistência de Estados:** Sistema nativo de alternância de temas (Modo Claro/Escuro) com adaptação dinâmica de variáveis CSS (`:root` e `[data-theme="dark"]`) para inversão instantânea de contraste.

---

## 💻 `Telas Principais`

| Tela de Apresentação | Tela Sobre |
| :---: | :---: |
| <img src="static/img/telas/dev-id.jpg" alt="Tela Apresentação" width="500"/> | <img src="static/img/telas/sobre.jpg" alt="Tela Sobre" width="500"/> | 
| Tela de Projetos | Tela de Contato |
| <img src="static/img/telas/projetos.jpg" alt="Tela de Projetos" width="500"/> | <img src="static/img/telas/conato.jpg" alt="Tela de Contato" width="500"/> | 

---

## 🛠️ `Tecnologias e Conceitos Aplicados`

| Segmento | Stack Tecnológica | Bibliotecas, APIs e Conceitos |
| :--- | :--- | :--- |
| **Interface & Core** | HTML5, CSS3 (Variáveis Dinâmicas) | Arquitetura de Grades (CSS Grid), Flexbox, Tipografia Fluída |
| **Lógica & Estados** | JavaScript Assíncrono (ES6) | Manipulação Condicional do DOM, Persistência de Tema, Manipuladores de Eventos |
| **Estética Retrô** | SVG Noise Filter, Animações em Passos | Boxicons API, Google Fonts (Press Start 2P, Orbitron, Fira Code) |

---

## 📁 `Estrutura do Repositório`

```text
portfolio/
├── static/
│   ├── css/
│   │   └── style.css          # Estilização global, variáveis brutalistas, texturização CRT e responsividade
│   ├── img/                   # Ativos de identidade visual e imagens otimizadas
│   └── js/
│       ├── main.js            # Inicialização, persistência de estados e manipulação do DOM (Temas/Eventos)
│       └── projetos.js        # Motor de injeção e renderização dinâmica do catálogo de projetos
├── templates/                 # Camada de Views estruturadas de forma semântica
│   ├── contato.html           # View do terminal de comunicação e conexões externas
│   └── index.html             # View principal (Painel Hero, Sobre Mim, Projetos e Janela Rodapé)
└── app.py                     # Arquivo backend e servidor de rotas (Flask)