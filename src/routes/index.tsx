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

const customerResults = [
  {
    image: "assets/depoimento-fossa-01.jpg",
    name: "Joao Ribeiro",
    location: "Presidente Tancredo Neves - BA",
    quote:
      "Com o material em maos, ficou mais facil entender a posicao das caixas e explicar para o pedreiro.",
    result: "Aplicacao em casa",
  },
  {
    image: "assets/depoimento-fossa-02.jpg",
    name: "Carlos Almeida",
    location: "Valenca - BA",
    quote:
      "O PDF ajudou a conferir a tubulacao e seguir uma ordem mais clara na montagem.",
    result: "Obra acompanhada",
  },
  {
    image: "assets/depoimento-fossa-03.jpg",
    name: "Marcos Santos",
    location: "Wenceslau Guimaraes - BA",
    quote:
      "Recomendo porque o projeto mostra o caminho e evita ficar fazendo tudo no improviso.",
    result: "Projeto aprovado pelo comprador",
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
  const [customerIndex, setCustomerIndex] = useState(0);
  const [salesUpdatedAt, setSalesUpdatedAt] = useState("agora");
  const [showScrollGuide, setShowScrollGuide] = useState(true);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setShowScrollGuide(false);
          setMaterialRevealed(true);
        } else if (entry.boundingClientRect.top > 0) {
          setShowScrollGuide(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(materialSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const now = new Date();
    setSalesUpdatedAt(
      now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  return (
    <main className="sales-page">
      <div className="urgent-topbar" role="status">
        CONDIÇÃO ATUAL: MATERIAL COMPLETO POR R$ 27 • ACESSO IMEDIATO
      </div>
      <section id="topo" className="hero-section hero-service-landing">
        <a className="brand-logo brand-logo-hero" href="#topo" aria-label="Projeto Fossa Séptica">
          <img
            src="assets/logo-projeto-fossa-septica.webp"
            alt="Projeto Fossa Séptica"
            fetchPriority="high"
            decoding="async"
          />
        </a>

        <h1 className="hero-service-title">
          Aprenda a instalar fossa séptica e comece a oferecer esse serviço
        </h1>

        <div className="hero-visual hero-avatar-visual">
          <img
            className="hero-avatar-image"
            src="assets/hero-service-fossa.jpg"
            alt="Apresentador segurando o material com uma instalação de fossa séptica ao fundo"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <p className="hero-service-subtitle">
          Material visual para quem está começando: veja a montagem passo a passo e entenda um serviço que pode ser cobrado de R$ 600 a R$ 800 por instalação.
        </p>

        <a className="primary-button hero-service-cta" href="#material">
          QUERO VER O PASSO A PASSO
        </a>

        <a
          className={`hero-scroll-guide hero-service-arrow ${showScrollGuide ? "" : "hero-scroll-guide-hidden"}`}
          href="#material"
          aria-label="Ir para a próxima seção"
          aria-hidden={!showScrollGuide}
          tabIndex={showScrollGuide ? 0 : -1}
        >
          <span className="hero-scroll-guide-arrow">↓</span>
        </a>

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

      <section className="customer-section testimonials-showcase" aria-labelledby="clientes-title">
        <div className="section-heading testimonials-heading">
          <h2 id="clientes-title">O que nossos clientes falam</h2>
        </div>

        <div className="testimonials-carousel-shell">
          <div
            className="testimonials-track"
            style={{ "--testimonial-index": customerIndex } as any}
          >
            {[...customerResults, ...customerResults.slice(0, 2)].map((customer, index) => (
              <article className="testimonial-card" key={`${customer.image}-${index}`}>
                <div className="testimonial-reviewer">
                  <div className="testimonial-avatar" aria-hidden="true">
                    {customer.name.charAt(0)}
                  </div>

                  <div className="testimonial-reviewer-meta">
                    <strong>{customer.name}</strong>
                    <span>{customer.location}</span>
                  </div>

                  <span className="testimonial-more" aria-hidden="true">⋮</span>
                </div>

                <div className="testimonial-stars" aria-label="5 estrelas">★★★★★</div>

                <p className="testimonial-quote">“{customer.quote}”</p>

                <div className="testimonial-footer">
                  <small>{customer.result}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="testimonials-controls">
            <button
              type="button"
              onClick={() => changeSlide(setCustomerIndex, customerResults.length, -1)}
              aria-label="Depoimentos anteriores"
            >
              ‹
            </button>

            <div className="testimonials-dots" aria-label="Navegação dos depoimentos">
              {customerResults.map((customer, index) => (
                <button
                  type="button"
                  className={index === customerIndex ? "active" : ""}
                  key={customer.image}
                  onClick={() => setCustomerIndex(index)}
                  aria-label={`Ver grupo começando por ${customer.name}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => changeSlide(setCustomerIndex, customerResults.length, 1)}
              aria-label="Próximos depoimentos"
            >
              ›
            </button>
          </div>
        </div>
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
            <p>Instalações desse tipo podem ser cobradas de R$ 600 a R$ 800, conforme a região e o tipo de serviço.</p>
          </div>
        </div>

        <a
          className="primary-button income-button income-promo-button"
          href="#comprar"
        >
          QUERO APRENDER O SERVIÇO
        </a>
      </section>

      <section id="comprar" className="final-cta">
        <div className="final-copy">
          <div className="brand-logo brand-logo-offer" aria-label="Projeto Fossa Séptica">
            <img
              src="assets/logo-projeto-fossa-septica.webp"
              alt="Projeto Fossa Séptica"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2>Receba agora o material completo de instalação de fossa séptica</h2>
          <img
            className="final-ebook-cover"
            src="assets/ebook-cover-3d.jpg"
            alt="Capa 3D do Projeto Fossa Septica Caixa D'agua"
            loading="lazy"
          />
        </div>

        <div className="final-offer-box">
          <div className="offer-price" aria-label="Oferta especial">
            <strong>Oferta de hoje</strong>
            <span className="offer-badge">-69% OFF</span>
            <div>
              <span className="old-price">De R$87</span>
              <span className="new-price">R$27</span>
            </div>
            <p className="offer-save">Voce economiza R$60 e recebe o PDF na hora.</p>
            <small>Pagamento unico. Acesso imediato ao material completo.</small>
          </div>

          <div className="final-action">
            <a className="primary-button final-button" href={checkoutUrl} onClick={handleCheckoutClick}>Comprar agora</a>
            <div className="sales-meter" aria-label="19 vendidos hoje">
              <strong>19 VENDIDOS HOJE</strong>
              <div className="sales-loading" aria-hidden="true">
                <span />
                <i />
              </div>
              <small className="sales-update">Atualizado às {salesUpdatedAt}</small>
              <img className="payment-banner" src="assets/payment-secure-banner.png" alt="Pagamento seguro e confiavel" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="guarantee-section" aria-labelledby="garantia-title">
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
              <strong>+5 anos no mercado</strong>
              <span>Há mais de 5 anos ajudando pessoas a mudar de realidade e construir uma renda mais sustentável.</span>
            </div>
          </div>
        </div>
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

        <a className="primary-button faq-cta" href={checkoutUrl} onClick={handleCheckoutClick}>QUERO VER O MATERIAL</a>
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
          </div>

          <small>© 2026 Projeto Fossa Séptica. Todos os direitos reservados.</small>
        </div>
      </footer>
    </main>
  );
}
