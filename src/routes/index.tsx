import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  KIWIFY_CHECKOUT_URL,
  captureAttribution,
  getTrackedKiwifyCheckoutUrl,
  trackMetaEvent,
} from "../lib/tracking";

export const Route = createFileRoute("/")({
  component: SepticProjectSalesPage,
});

const applicationBlocks = [
  {
    image: "assets/fossa-cliente-07.jpg",
    tag: "Montagem",
    title: "Caixas alinhadas com tubulacao aparente",
    text: "Ajuda o cliente a visualizar como o sistema fica antes do fechamento da obra.",
  },
  {
    image: "assets/fossa-cliente-02.jpg",
    tag: "Aplicacao",
    title: "Sistema instalado em area rural",
    text: "Mostra o modelo com caixas, conexoes e instalacao em solo aberto.",
  },
  {
    image: "assets/fossa-cliente-06.jpg",
    tag: "Detalhe",
    title: "Vista interna das caixas e conexoes",
    text: "Boa referencia para entender entrada, saida e passagem da tubulacao.",
  },
  {
    image: "assets/fossa-cliente-05.jpeg",
    tag: "Resultado",
    title: "Execucao com caixas e canos posicionados",
    text: "Foto forte para reforcar que o projeto e pratico e aplicavel na obra.",
  },
];

const materialPreviews = [
  {
    image: "assets/ebook-cover-3d.jpg",
    tag: "Capa do material",
    title: "Projeto Fossa Séptica Caixa D'água em PDF",
    text: "Veja a capa do material completo que você recebe após a compra.",
  },
  {
    image: "assets/pdf-material-01.jpg",
    tag: "Conteudo real do PDF",
    title: "Visao geral do sistema",
    text: "Página do material mostrando de forma visual como o sistema funciona na prática.",
  },
  {
    image: "assets/pdf-material-02.jpg",
    tag: "Referencias",
    title: "Medidas e referencias das caixas",
    text: "Orientações visuais para entender posição, componentes e montagem.",
  },
  {
    image: "assets/pdf-material-03.jpg",
    tag: "Passo a passo",
    title: "Furacao das tampas",
    text: "Etapa visual para preparar as caixas antes da instalação.",
  },
  {
    image: "assets/pdf-material-04.jpg",
    tag: "Montagem",
    title: "Montagem das caixas d'agua",
    text: "Página real mostrando a organização das caixas e as ligações do sistema.",
  },
  {
    image: "assets/pdf-material-05.jpg",
    tag: "Execucao",
    title: "Escavacao e preparo do local",
    text: "Exemplo do PDF mostrando a etapa de obra de forma simples e visual.",
  },
  {
    image: "assets/pdf-material-06.jpg",
    tag: "Finalizacao",
    title: "Acabamento e uso correto",
    text: "Conteúdo para consultar durante as etapas finais da instalação.",
  },
];

function EbookMockup() {
  return (
    <div className="ebook-stage">
      <img
        className="ebook-cover-image"
        src="assets/ebook-cover-3d.jpg"
        alt="Capa 3D do Projeto Fossa Septica Caixa D'agua em PDF"
        loading="lazy"
      />
    </div>
  );
}

function SepticProjectSalesPage() {
  const [materialIndex, setMaterialIndex] = useState(0);
  const [materialRevealed, setMaterialRevealed] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(KIWIFY_CHECKOUT_URL);
  const activePreview = materialPreviews[materialIndex] ?? materialPreviews[0]!;

  const changeSlide = (
    setter: Dispatch<SetStateAction<number>>,
    total: number,
    direction: number,
  ) => {
    setter((current) => (current + direction + total) % total);
  };

  const handleCheckoutClick = () => {
    trackMetaEvent("InitiateCheckout");
  };

  useEffect(() => {
    captureAttribution();
    setCheckoutUrl(getTrackedKiwifyCheckoutUrl());
  }, []);

  useEffect(() => {
    const offerSection = document.getElementById("comprar");

    if (!offerSection) return;

    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !sent) {
          sent = true;
          trackMetaEvent("ViewContent");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(offerSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const materialSection = document.getElementById("material");
    if (!materialSection) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setMaterialRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(materialSection);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="sales-page">
      <div className="urgent-topbar" role="status">
        PROJETO FOSSA SÉPTICA · PDF COMPLETO POR R$ 27 · ACESSO DIGITAL
      </div>
      <section id="topo" className="nova-hero" aria-labelledby="nova-title">
        <a className="nova-hero-logo" href="#topo" aria-label="Projeto Fossa Séptica, voltar ao topo">
          <img src="assets/logo-projeto-fossa-septica.webp" alt="Projeto Fossa Séptica" decoding="async" fetchPriority="high" />
        </a>
        <span className="nova-hero-eyebrow">GUIA EM PDF · PASSO A PASSO ILUSTRADO</span>
        <h1 id="nova-title">
          Aprenda a montagem de fossa séptica com caixas d'água e conheça um serviço para oferecer na sua região
        </h1>
        <p className="nova-hero-subtitle">
          Entenda as etapas da instalação com fotos, medidas e conexões organizadas em um material visual que você pode consultar quando precisar.
        </p>
        <ul className="nova-hero-benefits">
          <li>Veja a ordem da montagem sem depender de explicações soltas</li>
          <li>Confira referências de medidas, caixas e tubulações</li>
          <li>Tenha o passo a passo reunido em um único PDF</li>
        </ul>
        <div className="nova-hero-visual">
          <img
            className="nova-hero-product"
            src="assets/ebook-cover-3d.jpg"
            alt="Capa do material em PDF Projeto Fossa Séptica"
            fetchPriority="high"
            decoding="async"
          />
          <span className="nova-hero-visual-label">CONHEÇA O MATERIAL ANTES DE COMPRAR</span>
        </div>
        <a className="primary-button nova-hero-cta" href="#material">
          VER AS PÁGINAS DO MATERIAL
        </a>
        <p className="nova-hero-note">Prévia real do conteúdo · Pagamento único de R$ 27</p>
      </section>

      <section
        id="material"
        className={`material-section material-reveal ${materialRevealed ? "material-reveal-visible" : ""}`}
        aria-labelledby="material-title"
      >
        <div className="section-heading compact-heading">
          <h2 id="material-title">Veja exatamente o que você recebe</h2>
          <p>Fotos, medidas e etapas organizadas para você entender a montagem sem complicação.</p>
        </div>

        <div className="product-gallery" aria-label="Galeria do material">
          <div className="product-gallery-thumbs" aria-label="Miniaturas do material">
            {materialPreviews.map((item, index) => (
              <button
                type="button"
                className={`product-thumb ${index === materialIndex ? "active" : ""}`}
                key={item.title}
                onClick={() => setMaterialIndex(index)}
                aria-label={`Ver ${item.tag}`}
                aria-current={index === materialIndex ? "true" : undefined}
              >
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>

          <div className="product-gallery-main">
            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-left"
              onClick={() => changeSlide(setMaterialIndex, materialPreviews.length, -1)}
              aria-label="Imagem anterior"
            >
              ‹
            </button>

            <div className="product-gallery-stage" key={activePreview.title}>
              <img
                className="product-gallery-image"
                src={activePreview.image}
                alt={activePreview.title}
                loading="lazy"
                decoding="async"
              />
            </div>

            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-right"
              onClick={() => changeSlide(setMaterialIndex, materialPreviews.length, 1)}
              aria-label="Próxima imagem"
            >
              ›
            </button>

            <div className="product-gallery-progress" aria-hidden="true">
              <span
                style={{
                  width: `${((materialIndex + 1) / materialPreviews.length) * 100}%`,
                }}
              />
            </div>
          </div>

        </div>

        <div className="application-gradient-zone">
          <div className="application-intro">
            <h1>Feito para quem quer aprender sem complicação</h1>
          </div>

          <div className="application-grid">
            {applicationBlocks.map((block) => (
              <article className="application-card" key={block.image}>
                <img src={block.image} alt={block.title} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nova-benefits" aria-labelledby="nova-benefits-title">
        <span className="nova-section-kicker">O QUE VOCÊ GANHA NA PRÁTICA</span>
        <h2 id="nova-benefits-title">Um guia que transforma etapas técnicas em orientações mais fáceis de entender</h2>
        <div className="nova-benefit-grid">
          <article><span>01</span><h3>Ordem de montagem</h3><p>Entenda por onde começar e qual é a sequência das principais etapas.</p></article>
          <article><span>02</span><h3>Referências visuais</h3><p>Veja imagens de caixas, conexões e tubulações para reconhecer os componentes.</p></article>
          <article><span>03</span><h3>Consulta rápida</h3><p>Volte às imagens do PDF sempre que precisar revisar uma etapa do material.</p></article>
          <article><span>04</span><h3>Preparação para aprender</h3><p>Organize seu conhecimento antes de avaliar a possibilidade de oferecer o serviço.</p></article>
        </div>
      </section>

      <section className="nova-audience" aria-labelledby="nova-audience-title">
        <div className="nova-audience-copy">
          <span className="nova-section-kicker">ESSE MATERIAL FOI PENSADO PARA VOCÊ?</span>
          <h2 id="nova-audience-title">Para quem quer aprender sem começar do zero</h2>
          <p>Uma referência visual para quem busca entender melhor uma instalação com caixas d'água.</p>
        </div>
        <ul>
          <li>Quem está começando e precisa visualizar a montagem</li>
          <li>Quem trabalha com obras, manutenção ou pequenos serviços</li>
          <li>Quem deseja estudar a técnica antes de oferecer um novo serviço</li>
          <li>Quem quer conversar com o responsável pela obra com mais clareza</li>
        </ul>
        <small>O PDF é material de referência, não substitui avaliação do terreno, exigências sanitárias, normas aplicáveis nem o trabalho de profissional habilitado quando necessário.</small>
      </section>

      <section className="nova-proof" aria-labelledby="nova-proof-title">
        <span className="nova-section-kicker">TRANSPARÊNCIA</span>
        <h2 id="nova-proof-title">Você vê o conteúdo antes de decidir</h2>
        <p>Sem depoimentos inventados ou promessas de ganhos: a melhor prova aqui são as páginas e fotos que demonstram o que o material ensina.</p>
        <div className="nova-proof-grid">
          <img src="assets/pdf-material-02.jpg" alt="Página do PDF com referências de medidas" loading="lazy" />
          <img src="assets/pdf-material-04.jpg" alt="Página do PDF com detalhes da montagem" loading="lazy" />
          <img src="assets/fossa-cliente-07.jpg" alt="Fotografia de instalação com caixas e tubulações" loading="lazy" />
        </div>
        <a href="#material" className="nova-inline-link">Rever todas as páginas do PDF →</a>
      </section>

      <section className="confidence-section">
        <div className="confidence-copy">
          <span>Sem complicação</span>
          <h2>Não comece do zero: siga um modelo pronto, visual e fácil de consultar.</h2>
          <p>
            Veja a ordem da montagem, as conexões e as principais etapas para entender o serviço com mais segurança.
          </p>
        </div>
        <div className="confidence-docs" aria-hidden="true">
          <EbookMockup />
        </div>
      </section>

      <section className="income-section income-promo-section" aria-labelledby="income-title">
        <div className="income-promo-heading">
          <span className="income-promo-kicker">DEPOIS DE APRENDER</span>
          <h2>TRANSFORME O APRENDIZADO EM UM SERVIÇO PARA OFERECER NA SUA REGIÃO</h2>
        </div>

        <div className="income-promo-banner">
          <img
            className="income-promo-image"
            src="assets/income-opportunity-banner.jpg"
            alt="Instalação de fossa séptica com caixas d'água"
            loading="lazy"
          />

          <div className="income-promo-overlay-text">
            <h1 id="income-title">UM NOVO SERVIÇO PARA VOCÊ OFERECER</h1>
            <p>Um tipo de serviço que você pode estudar para oferecer conforme sua experiência, a demanda local e as exigências técnicas. Não existe garantia de clientes ou renda.</p>
          </div>
        </div>

        <a
          className="primary-button income-button income-promo-button"
          href="#comprar"
        >
          QUERO APRENDER O SERVIÇO
        </a>
      </section>

      <section id="comprar" className="final-cta nova-checkout-section">
        <div className="final-copy">
          <div className="brand-logo brand-logo-offer" aria-label="Projeto Fossa Séptica">
            <img src="assets/logo-projeto-fossa-septica.webp" alt="Projeto Fossa Séptica" loading="lazy" decoding="async" />
          </div>
          <h2>Receba o material completo para consultar o passo a passo</h2>
          <img className="final-ebook-cover" src="assets/ebook-cover-3d.jpg" alt="Capa do guia Projeto Fossa Séptica em PDF" loading="lazy" />
          <div className="nova-offer-contents">
            <h3>O que está incluído no PDF</h3>
            <ul>
              <li>Visão geral do sistema e seus componentes</li>
              <li>Medidas e referências para organizar as caixas</li>
              <li>Preparação e furação das tampas</li>
              <li>Montagem e conexão das tubulações</li>
              <li>Escavação e preparo do local</li>
              <li>Orientações visuais para finalização</li>
            </ul>
          </div>
        </div>
        <div className="final-offer-box nova-offer-card">
          <div className="offer-price" aria-label="Preço do material">
            <strong>Material completo em PDF</strong>
            <span className="nova-price-label">PAGAMENTO ÚNICO</span>
            <div><span className="new-price">R$ 27</span></div>
            <p className="offer-save">Sem mensalidade. Acesso digital após a confirmação do pagamento.</p>
            <small>Confira as páginas do material acima antes de comprar.</small>
          </div>
          <div className="final-action">
            <a className="primary-button final-button" href={checkoutUrl} onClick={handleCheckoutClick}>
              QUERO RECEBER O MATERIAL
            </a>
            <div className="nova-offer-safety">
              <span>Pagamento pela Kiwify</span>
              <span>Entrega digital</span>
              <span>Garantia de 7 dias</span>
            </div>
            <img className="payment-banner" src="assets/payment-secure-banner.png" alt="Meios de pagamento disponíveis no checkout" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section id="garantia" className="guarantee-section" aria-labelledby="garantia-title">
        <div className="guarantee-card">
          <div className="guarantee-seal-wrap">
            <img
              className="guarantee-seal-image"
              src="assets/garantia-7-dias.webp"
              alt="Garantia de 7 dias"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="guarantee-copy">
            <span className="guarantee-kicker">Você compra com mais segurança</span>
            <h2 id="garantia-title">Garantia de 7 dias</h2>
            <p>
              Você tem 7 dias para conhecer o material. Se por qualquer motivo ele não fizer sentido para você,
              solicite o reembolso dentro desse prazo.
            </p>

            <div className="guarantee-trust">
              <strong>Compromisso com a clareza</strong>
              <span>Você confere o conteúdo, o preço e as condições antes de decidir. Não prometemos renda garantida.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pos-compra" className="nova-post-purchase" aria-labelledby="nova-post-title">
        <span className="nova-section-kicker">DEPOIS DA COMPRA</span>
        <h2 id="nova-post-title">Como você recebe o material?</h2>
        <div className="nova-steps">
          <article><span>1</span><h3>Finalize o pedido</h3><p>Escolha a forma de pagamento no checkout seguro da Kiwify.</p></article>
          <article><span>2</span><h3>Aguarde a confirmação</h3><p>Após a confirmação, siga as instruções enviadas pela plataforma de compra para acessar o conteúdo.</p></article>
          <article><span>3</span><h3>Abra seu guia</h3><p>Acesse o material digital e consulte as páginas quando precisar revisar as etapas.</p></article>
        </div>
        <p className="nova-post-footnote">Em caso de dúvidas sobre acesso ou reembolso, utilize os canais de suporte informados na confirmação do pedido.</p>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="faq-heading">
          <span>DÚVIDAS FREQUENTES</span>
          <h2 id="faq-title">Perguntas e respostas</h2>
          <p>Confira as principais dúvidas antes de comprar o material.</p>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>O que eu recebo após a compra?</summary>
            <p>Você recebe um material em PDF com fotos, etapas, medidas e referências visuais para entender a montagem e consultar durante o serviço.</p>
          </details>

          <details className="faq-item">
            <summary>Preciso ter experiência para entender o material?</summary>
            <p>Não. O material foi feito para quem está começando, com linguagem simples, imagens e uma sequência visual da instalação.</p>
          </details>

          <details className="faq-item">
            <summary>O acesso é imediato?</summary>
            <p>Sim. Após a confirmação do pagamento, o acesso ao material é liberado para você consultar.</p>
          </details>

          <details className="faq-item">
            <summary>Posso usar o projeto como referência em uma instalação?</summary>
            <p>Sim. O PDF serve como base de consulta e organização da montagem. Quando houver exigências técnicas ou legais na sua região, consulte também um profissional habilitado.</p>
          </details>

          <details className="faq-item">
            <summary>Quanto custa o material?</summary>
            <p>Hoje o valor apresentado na oferta é de R$ 27, em pagamento único.</p>
          </details>

          <details className="faq-item">
            <summary>Consigo começar a oferecer esse serviço depois de aprender?</summary>
            <p>O material ajuda você a entender a montagem e se preparar para oferecer o serviço. O valor cobrado e os resultados variam conforme região, experiência, demanda e execução.</p>
          </details>
        </div>

        <a className="primary-button faq-cta" href="#comprar">REVER PREÇO E CONTEÚDO</a>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand footer-brand-logo">
            <img
              src="assets/logo-projeto-fossa-septica.webp"
              alt="Projeto Fossa Séptica"
              loading="lazy"
              decoding="async"
            />
            <span>Material visual para instalação de fossa séptica</span>
          </div>

          <p>
            Material visual e direto para quem quer entender a instalação de uma fossa séptica com caixas d'água e usar o conteúdo como apoio na prática.
          </p>

          <div className="footer-links">
            <a href="#topo">Voltar ao topo</a>
            <a href="#material">Ver o material</a>
            <a href="#comprar">Ver oferta</a>
            <a href="#pos-compra">Como receber</a>
            <a href="#garantia">Garantia</a>
          </div>

          <small>© 2026 Projeto Fossa Séptica. Todos os direitos reservados. Material educativo de referência; resultados financeiros dependem da experiência, da demanda e das condições de cada serviço.</small>
        </div>
      </footer>
    </main>
  );
}
