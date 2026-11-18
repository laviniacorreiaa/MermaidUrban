
/* ==================================
   CONFIGURAÇÕES DA MERMAID URBAN
================================== */

const WHATSAPP = "5511994856547";

const LINK_PAGAMENTO = "";

const CHAVE_PIX = "";


/* ==================================
   PRODUTOS
================================== */

// Para adicionar fotos, coloque os links dentro de "imagens".
// Separe cada link por vírgula.
// A primeira imagem será a foto principal.

const produtos = [
  {
    id: 1,
    nome: "Colar Conchinha",
    categoria: "Colares",
    descricao: "Inspirado na beleza do oceano",
    preco: 39.90,
    imagens: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"
    ],
    destaque: "MAIS VENDIDO"
  },
  {
    id: 2,
    nome: "Brinco Pérola",
    categoria: "Brincos",
    descricao: "Delicado e sofisticado",
    preco: 29.90,
    imagens: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600"
    ],
    destaque: "FAVORITO"
  },
  {
    id: 3,
    nome: "Pulseira Ocean",
    categoria: "Pulseiras",
    descricao: "Um toque de verão",
    preco: 34.90,
    imagens: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600"
    ],
    destaque: "NOVO"
  },
  {
    id: 4,
    nome: "Anel Dourado",
    categoria: "Bijuterias",
    descricao: "Minimalista e moderno",
    preco: 24.90,
    imagens: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600"
    ],
    destaque: "DESTAQUE"
  },
  {
    id: 5,
    nome: "Colar Pérolas",
    categoria: "Colares",
    descricao: "Elegância em cada detalhe",
    preco: 44.90,
    imagens: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"
    ],
    destaque: "FAVORITO"
  },
  {
    id: 6,
    nome: "Argola Summer",
    categoria: "Brincos",
    descricao: "Perfeita para qualquer ocasião",
    preco: 32.90,
    imagens: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600"
    ],
    destaque: "NOVO"
  },
  {
    id: 7,
    nome: "Pulseira Pérolas",
    categoria: "Pulseiras",
    descricao: "Charme e delicadeza",
    preco: 37.90,
    imagens: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600"
    ],
    destaque: "DESTAQUE"
  },
  {
    id: 8,
    nome: "Anel Ocean",
    categoria: "Bijuterias",
    descricao: "Seu toque especial",
    preco: 27.90,
    imagens: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600"
    ],
    destaque: "NOVO"
  }
];


/* ==================================
   CARRINHO
================================== */

let carrinho = [];

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


/* ==================================
   CARREGAR PRODUTOS
================================== */

function carregarProdutos(categoria = "Todos") {

  const lista = document.getElementById("listaProdutos");

  const filtrados = categoria === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoria);

  lista.innerHTML = filtrados.map(produto => {

    const imagens = produto.imagens || [produto.imagem];

    return `
      <article class="product">

        <div class="product-image">

          <button
            class="product-photo-button"
            onclick="abrirFotos(${produto.id})"
            aria-label="Ampliar fotos de ${produto.nome}"
          >

            <img
              src="${imagens[0]}"
              alt="${produto.nome}"
              loading="lazy"
            >

            <span class="zoom-hint">⌕ VER FOTOS</span>

          </button>

          <span class="product-tag">${produto.destaque}</span>

          ${imagens.length > 1 ? `
            <span class="photo-count">
              📷 ${imagens.length} fotos
            </span>
          ` : ""}

        </div>

        <div class="product-info">

          <h3>${produto.nome}</h3>

          <p>${produto.descricao}</p>

          <div class="price">${moeda(produto.preco)}</div>

          <button
            class="add-button"
            onclick="adicionarCarrinho(${produto.id})"
          >
            + ADICIONAR
          </button>

        </div>

      </article>
    `;

  }).join("");

}


/* ==================================
   FILTROS
================================== */

function filtrar(categoria, botao) {

  document.querySelectorAll(".filter").forEach(item => {
    item.classList.remove("active");
  });

  botao.classList.add("active");

  carregarProdutos(categoria);

}


/* ==================================
   GALERIA DE FOTOS
================================== */

let produtoAtual = null;
let fotoAtual = 0;

function abrirFotos(id) {

  produtoAtual = produtos.find(p => p.id === id);

  if (!produtoAtual) return;

  fotoAtual = 0;

  const modal = document.getElementById("modalFotos");

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("gallery-open");

  atualizarGaleria();

}


function atualizarGaleria() {

  if (!produtoAtual) return;

  const imagens = produtoAtual.imagens || [produtoAtual.imagem];

  const imagemPrincipal = document.getElementById("fotoAmpliada");

  imagemPrincipal.src = imagens[fotoAtual];
  imagemPrincipal.alt = produtoAtual.nome;

  document.getElementById("nomeFotoProduto").textContent =
    produtoAtual.nome;

  document.getElementById("contadorFotos").textContent =
    `Foto ${fotoAtual + 1} de ${imagens.length}`;

  const miniaturas = document.getElementById("miniaturasFotos");

  miniaturas.innerHTML = imagens.map((imagem, index) => `
    <button
      class="photo-thumbnail ${index === fotoAtual ? "selected" : ""}"
      onclick="selecionarFoto(${index})"
      aria-label="Visualizar foto ${index + 1}"
    >
      <img src="${imagem}" alt="${produtoAtual.nome} - Foto ${index + 1}">
    </button>
  `).join("");

  const temVariasFotos = imagens.length > 1;

  document.querySelector(".photo-prev").style.display =
    temVariasFotos ? "flex" : "none";

  document.querySelector(".photo-next").style.display =
    temVariasFotos ? "flex" : "none";

}


function selecionarFoto(index) {

  if (!produtoAtual) return;

  fotoAtual = index;

  atualizarGaleria();

}


function mudarFoto(direcao) {

  if (!produtoAtual) return;

  const imagens = produtoAtual.imagens || [produtoAtual.imagem];

  fotoAtual += direcao;

  if (fotoAtual >= imagens.length) {
    fotoAtual = 0;
  }

  if (fotoAtual < 0) {
    fotoAtual = imagens.length - 1;
  }

  atualizarGaleria();

}


function fecharFotos() {

  const modal = document.getElementById("modalFotos");

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("gallery-open");

  produtoAtual = null;
  fotoAtual = 0;

}


// Fecha ao clicar fora da imagem.

document.getElementById("modalFotos").addEventListener(
  "click",
  function(event) {

    if (event.target === this) {
      fecharFotos();
    }

  }
);


// Navegação pelo teclado.

document.addEventListener("keydown", function(event) {

  const modal = document.getElementById("modalFotos");

  if (modal.style.display !== "flex") return;

  if (event.key === "Escape") {
    fecharFotos();
  }

  if (event.key === "ArrowRight") {
    mudarFoto(1);
  }

  if (event.key === "ArrowLeft") {
    mudarFoto(-1);
  }

});


/* ==================================
   ADICIONAR PRODUTO
================================== */

function adicionarCarrinho(id) {

  const produto = produtos.find(p => p.id === id);

  const existente = carrinho.find(p => p.id === id);

  if (existente) {

    existente.quantidade++;

  } else {

    carrinho.push({
      ...produto,
      quantidade: 1
    });

  }

  atualizarCarrinho();

  alert(produto.nome + " adicionado ao carrinho! 🐚");

}


/* ==================================
   ATUALIZAR CARRINHO
================================== */

function atualizarCarrinho() {

  const quantidade = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  document.getElementById("contador").textContent = quantidade;

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  document.getElementById("total").textContent = moeda(total);

  document.getElementById("checkoutTotal").textContent = moeda(total);

  const container = document.getElementById("itensCarrinho");

  if (carrinho.length === 0) {

    container.innerHTML = "<p>Seu carrinho está vazio. 💙</p>";

    return;

  }

  container.innerHTML = carrinho.map(item => `
    <div class="cart-item">

      <div class="cart-item-info">

        <strong>${item.nome}</strong>

        <p>${moeda(item.preco)} cada</p>

        <div class="quantity-controls">

          <button onclick="alterarQuantidade(${item.id}, -1)">−</button>

          <span>${item.quantidade}</span>

          <button onclick="alterarQuantidade(${item.id}, 1)">+</button>

        </div>

      </div>

      <strong>${moeda(item.preco * item.quantidade)}</strong>

      <button onclick="removerItem(${item.id})">
        Remover
      </button>

    </div>
  `).join("");

}


/* ==================================
   ALTERAR QUANTIDADE
================================== */

function alterarQuantidade(id, valor) {

  const item = carrinho.find(p => p.id === id);

  if (!item) return;

  item.quantidade += valor;

  if (item.quantidade <= 0) {

    removerItem(id);

  } else {

    atualizarCarrinho();

  }

}


/* ==================================
   REMOVER PRODUTO
================================== */

function removerItem(id) {

  carrinho = carrinho.filter(p => p.id !== id);

  atualizarCarrinho();

}


/* ==================================
   ABRIR E FECHAR CARRINHO
================================== */

function abrirCarrinho() {

  atualizarCarrinho();

  document.getElementById("modalCarrinho").style.display = "flex";

}


function fecharCarrinho() {

  document.getElementById("modalCarrinho").style.display = "none";

}


/* ==================================
   CHECKOUT
================================== */

function irCheckout() {

  if (carrinho.length === 0) {

    alert("Seu carrinho está vazio!");

    return;

  }

  fecharCarrinho();

  document.getElementById("checkoutTotal").textContent =
    moeda(calcularTotal());

  document.getElementById("modalCheckout").style.display = "flex";

}


function fecharCheckout() {

  document.getElementById("modalCheckout").style.display = "none";

}


function calcularTotal() {

  return carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

}


/* ==================================
   GERAR MENSAGEM DO PEDIDO
================================== */

function gerarMensagem(nome, telefone, endereco, pagamento) {

  let mensagem = "🐚 *NOVO PEDIDO - MERMAID URBAN* 🐚\n\n";

  mensagem += "*CLIENTE:* " + nome + "\n";
  mensagem += "*WHATSAPP:* " + telefone + "\n";
  mensagem += "*ENDEREÇO:* " + endereco + "\n\n";

  mensagem += "*PRODUTOS:*\n";

  carrinho.forEach(item => {

    mensagem +=
      `${item.quantidade}x ${item.nome} - ${moeda(item.preco * item.quantidade)}\n`;

  });

  mensagem += "\n*TOTAL: " + moeda(calcularTotal()) + "*\n";
  mensagem += "*PAGAMENTO:* " + pagamento + "\n\n";

  if (pagamento === "Pix" && CHAVE_PIX) {

    mensagem += "*CHAVE PIX:* " + CHAVE_PIX + "\n\n";

  }

  mensagem += "Olá! Gostaria de confirmar meu pedido. 💙";

  return mensagem;

}


/* ==================================
   FINALIZAR PEDIDO
================================== */

document.getElementById("checkoutForm").addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    if (carrinho.length === 0) {

      alert("Seu carrinho está vazio!");

      return;

    }

    const nome = document.getElementById("nome").value.trim();

    const telefone = document.getElementById("telefoneCliente").value.trim();

    const endereco = document.getElementById("endereco").value.trim();

    const pagamento = document.getElementById("pagamento").value;

    if (!nome || !telefone || !endereco || !pagamento) {

      alert("Preencha todos os campos!");

      return;

    }

    if (!/^55\d{10,11}$/.test(WHATSAPP)) {

      alert("Configure o número correto do WhatsApp da loja no script.js.");

      return;

    }

    if (
      pagamento === "Pagamento online" &&
      !LINK_PAGAMENTO.trim()
    ) {

      alert(
        "O link de pagamento ainda não foi configurado. Escolha Pix ou combinar pelo WhatsApp."
      );

      return;

    }

    const mensagem = gerarMensagem(
      nome,
      telefone,
      endereco,
      pagamento
    );

    const urlWhatsApp =
      "https://wa.me/" + WHATSAPP +
      "?text=" + encodeURIComponent(mensagem);

    if (pagamento === "Pagamento online") {

      window.open(LINK_PAGAMENTO, "_blank");

    }

    window.open(urlWhatsApp, "_blank");

    fecharCheckout();

  }
);


/* ==================================
   CONTATO
================================== */

function irWhatsApp() {

  if (!/^55\d{10,11}$/.test(WHATSAPP)) {

    alert("Configure o WhatsApp da loja no script.js.");

    return;

  }

  const mensagem = encodeURIComponent(
    "Olá! Conheci a Mermaid Urban pelo site e gostaria de conhecer os acessórios. 🐚"
  );

  window.open(
    "https://wa.me/" + WHATSAPP + "?text=" + mensagem,
    "_blank"
  );

}


/* ==================================
   INICIALIZAÇÃO
================================== */

carregarProdutos();

atualizarCarrinho();
