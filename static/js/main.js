// ==========================================
// 📄 LOGICA DE RENDERIZAÇÃO DOS PROJETOS
// ==========================================

const containerProjetos = document.getElementById('container-projetos');

function renderizarProjetos() {
    // Busca a array global definida no window pelo arquivo projetos.js
    const meusProjetos = window.meusProjetos;

    if (!containerProjetos || !meusProjetos) return;

    containerProjetos.innerHTML = meusProjetos.map(projeto => {
        // Mapeia as tags com base nas regras de cores
        const tagsHTML = projeto.tags.map(tag => {
            let tagClass = "sys-tag acid";
            const tagNormalizada = tag.toLowerCase();
            if (tagNormalizada.includes('react') || tagNormalizada.includes('typescript')) {
                tagClass = "sys-tag blue";
            } else if (tagNormalizada.includes('bootstrap') || tagNormalizada.includes('figma') || tagNormalizada.includes('whatsapp')) {
                tagClass = "sys-tag pink";
            }
            return `<span class="${tagClass}">${tag}</span>`;
        }).join('');

        // Segurança extra: Garante que "imagens" é um array válido para evitar quebras
        const listaImagens = projeto.imagens || [];

        // Molda os slides de imagens do carrossel interno (Caminho relativo sem a barra inicial)
        const slidesHTML = listaImagens.map((img, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                <img src="static/img/${img}" alt="Tela ${index + 1} de ${projeto.titulo}">
            </div>
        `).join('');

        // CONDICIONAL DO BOTÃO DEMO: Só cria o HTML se houver um link real que não seja "#" ou vazio
        let botaoDemoHTML = '';
        if (projeto.linkDemo && projeto.linkDemo !== '#' && projeto.linkDemo.trim() !== '') {
            botaoDemoHTML = `
                <a href="${projeto.linkDemo}" target="_blank" class="project-link">
                    <i class='bx bx-link-external'></i> ACESSAR SITE
                </a>
            `;
        }

        // Retorna a estrutura final com os controles do carrossel embutidos
        return `
            <div class="brutalist-card project-card" style="--accent-color: ${projeto.corAccent}">
                <div class="card-header">
                    <span class="sys-folder font-pixel">PROJETO_${projeto.id}.EXE</span>
                    <div class="header-controls">
                        <i class='bx bx-x'></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3>${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                    
                    <div class="project-art carousel-container">
                        <div class="carousel-track">
                            ${slidesHTML}
                        </div>
                        <button class="carousel-btn btn-prev" aria-label="Slide Anterior">&lt;</button>
                        <button class="carousel-btn btn-next" aria-label="Próximo Slide">&gt;</button>
                    </div>

                    <div class="tag-grid tiny" style="margin-bottom: 20px;">
                        ${tagsHTML}
                    </div>

                    <div class="project-actions">
                        <a href="${projeto.linkCodigo}" target="_blank" class="project-link" style="margin-right: 15px;">
                            <i class='bx bx-code-alt'></i> CÓDIGO
                        </a>
                        ${botaoDemoHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    configurarEfeitosHover();
    inicializarCarrosséis();
}

function configurarEfeitosHover() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active-card');
            const accentColor = card.style.getPropertyValue('--accent-color').trim();
            if (accentColor) card.style.setProperty('--accent-color', accentColor);
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active-card');
        });
    });
}

function inicializarCarrosséis() {
    const carrousels = document.querySelectorAll('.carousel-container');

    carrousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextBtn = carousel.querySelector('.btn-next');
        const prevBtn = carousel.querySelector('.btn-prev');
        let currentIdx = 0;

        if (slides.length <= 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            return;
        }

        function mudarSlide(novoIndex) {
            slides[currentIdx].classList.remove('active');
            currentIdx = (novoIndex + slides.length) % slides.length;
            slides[currentIdx].classList.add('active');
        }

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mudarSlide(currentIdx + 1);
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mudarSlide(currentIdx - 1);
        });
    });
}

// ==========================================
// 🌗 LOGICA DE ALTERNAÇÃO DE TEMA (DARK/LIGHT)
// ==========================================

function inicializarMenuTema() {
    const botaoTema = document.querySelector('.theme-toggle-btn');
    if (!botaoTema) return;

    const temaSalvo = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', temaSalvo);
    atualizarBotaoIcone(botaoTema, temaSalvo);

    botaoTema.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('theme', novoTema);
        atualizarBotaoIcone(botaoTema, novoTema);
    });
}

function atualizarBotaoIcone(botao, tema) {
    const icone = botao.querySelector('i');
    if (!icone) return;

    if (tema === 'dark') {
        icone.className = 'bx bx-sun';
    } else {
        icone.className = 'bx bx-moon';
    }
}

// ==========================================
// 🔌 LOGICA DINÂMICA DO FOOTER_MATRIX
// ==========================================

function startFooterSystems() {
    const clockElement = document.getElementById('footer-clock');
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0];
            clockElement.textContent = timeString;
        }, 1000);
    }

    const pingElement = document.getElementById('ping-shuttle');
    if (pingElement) {
        setInterval(() => {
            const randomPing = Math.floor(Math.random() * (28 - 12 + 1)) + 12;
            pingElement.textContent = `${randomPing}ms`;
        }, 3000);
    }
}

// ==========================================
// ⚡ INICIALIZAÇÃO GERAL DO SISTEMA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarProjetos();
    inicializarMenuTema();
    startFooterSystems();
});