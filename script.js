
/* ==================================
   CONFIGURAÇÕES DA MERMAID URBAN
================================== */

// Coloque seu WhatsApp com código do país e DDD.
const WHATSAPP = "5511994856547";

// Cole aqui seu link de pagamento do Mercado Pago.
// Exemplo: https://link.mercadopago.com.br/sualoja
const LINK_PAGAMENTO = "";

// Coloque sua chave Pix, se desejar mostrar no atendimento.
const CHAVE_PIX = "";


/* ==================================
   PRODUTOS
================================== */

const produtos = [
  {
    id: 1,
    nome: "Colar Conchinha",
    categoria: "Colares",
    descricao: "Inspirado na beleza do oceano",
    preco: 39.90,
    imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    destaque: "MAIS VENDIDO"
  },
  {
    id: 2,
    nome: "Brinco Pérola",
    categoria: "Brincos",
    descricao: "Delicado e sofisticado",
    preco: 29.90,
    imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
    destaque: "FAVORITO"
  },
  {
    id: 3,
    nome: "Pulseira Ocean",
    categoria: "Pulseiras",
    descricao: "Um toque de verão",
    preco: 34.90,
    imagem: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600",
    destaque: "NOVO"
  },
  {
    id: 4,
    nome: "Anel Dourado",
    categoria: "Bijuterias",
    descricao: "Minimalista e moderno",
    preco: 24.90,
    imagem: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
    destaque: "DESTAQUE"
  },
  {
    id: 5,
    nome: "Colar Pérolas",
    categoria: "Colares",
    descricao: "Elegância em cada detalhe",
    preco: 44.90,
    imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
    destaque: "FAVORITO"
  },
  {
    id: 6,
    nome: "Argola Summer",
    categoria: "Brincos",
    descricao: "Perfeita para qualquer ocasião",
    preco: 32.90,
    imagem: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600",
    destaque: "NOVO"
  },
  {
    id: 7,
    nome: "Pulseira Pérolas",
    categoria: "Pulseiras",
    descricao: "Charme e delicadeza",
    preco: 37.90,
    imagem: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
    destaque: "DESTAQUE"
  },
  {
    id: 8,
    nome: "Anel Ocean",
    categoria: "Bijuterias",
    descricao: "Seu toque especial",
    preco: 27.90,
    imagem: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600",
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

function carregarProdutos(categoria = "Todos") {
  const lista = document.getElementById("listaProdutos");

  const filtrados = categoria === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoria);

  lista.innerHTML = filtrados.map(produto => `
    <article class="product">

      <div class="product-image">
        <img
          src="${produto.imagem}"
          alt="${produto.nome}"
          loading="lazy"
        >
        <span class="product-tag">${produto.destaque}</span>
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
  `).join("");
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

      // Abre o checkout previamente configurado pela loja.
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
