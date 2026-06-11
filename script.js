// Espera que todo o DOM seja totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SISTEMA DE ACCORDION (EXPANSÍVEIS)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            const isAlreadyActive = currentItem.classList.contains("active");
            
            // Fecha todos os itens ativos antes de abrir o novo (estilo sanfona clássico)
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });
            
            // Se não estava ativo, abre o atual
            if (!isAlreadyActive) {
                currentItem.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ==========================================================================
       2. ACESSIBILIDADE - REDIMENSIONAMENTO DE FONTE
       ========================================================================== */
    let tamanhoFonteAtual = 100; // Percentual base
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");

    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonteAtual < 130) { // Limite máximo seguro para o layout
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonteAtual > 80) { // Limite mínimo
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    /* ==========================================================================
       3. ACESSIBILIDADE - ALTERNAÇÃO DE TEMA (CLARO/ESCURO)
       ========================================================================== */
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    /* ==========================================================================
       4. ACESSIBILIDADE - LEITURA POR VOZ (SpeechSynthesis API)
       ========================================================================== */
    const btnVozLer = document.getElementById("btn-voz-ler");
    const btnVozParar = document.getElementById("btn-voz-parar");
    let synthUtterance = null;

    btnVozLer.addEventListener("click", () => {
        // Cancela qualquer fala que já esteja rodando no navegador
        window.speechSynthesis.cancel();

        // Captura apenas o conteúdo textual estrutural principal
        const areaConteudo = document.querySelector(".content-area");
        
        // Coleta textos apenas de elementos informativos, ignorando a caixa de comentários inteira
        const seletoresAlvo = "p, h1, h2, h3, blockquote";
        const elementosTexto = areaConteudo.querySelectorAll(seletoresAlvo);
        
        let textoParaLer = "";
        elementosTexto.forEach(elemento => {
            // Verifica se o elemento não está dentro da área de comentários
            if (!elemento.closest(".area-comentarios")) {
                textoParaLer += elemento.innerText + ". ";
            }
        });

        if (textoParaLer.trim() !== "") {
            synthUtterance = new SpeechSynthesisUtterance(textoParaLer);
            synthUtterance.lang = "pt-BR";
            synthUtterance.rate = 1.0; // Velocidade natural de conversação
            
            window.speechSynthesis.speak(synthUtterance);
        }
    });

    btnVozParar.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });

    /* ==========================================================================
       5. FORMULÁRIO DE INSCRIÇÃO DO SEMINÁRIO
       ========================================================================== */
    const formInscricao = document.getElementById("form-inscricao");
    const msgSucesso = document.getElementById("msg-sucesso-inscricao");

    formInscricao.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita o reload da página
        
        // Esconde o formulário de forma polida e exibe mensagem de sucesso modernizada
        formInscricao.style.display = "none";
        msgSucesso.style.display = "block";
    });

    /* ==========================================================================
       6. INTERAÇÃO DO LEITOR - SISTEMA DE COMENTÁRIOS LOCAL
       ========================================================================== */
    const formComentario = document.getElementById("form-comentario");
    const txtComentario = document.getElementById("txt-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const texto = txtComentario.value.trim();
        if (texto === "") return;

        // Cria o elemento de card para o novo comentário
        const card = document.createElement("div");
        card.className = "comentario-card";

        // Formata data e hora do envio de forma dinâmica
        const dataAtual = new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        card.innerHTML = `
            <div class="comentario-meta">Enviado por Leitor Anônimo em ${dataAtual}</div>
            <p style="margin: 0; text-align: left; color: inherit;">${texto}</p>
        `;

        // Adiciona ao topo da lista de comentários
        listaComentarios.insertBefore(card, listaComentarios.firstChild);

        // Limpa o campo de texto
        txtComentario.value = "";
    });
});








