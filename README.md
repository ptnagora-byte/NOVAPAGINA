# NOVAPAGINA — Projeto Fossa Séptica

Nova versão da página de vendas em React/TanStack Start, baseada na arquitetura de low-ticket discutida na aula enviada.

## O que foi aplicado
1. Primeira dobra responsiva com promessa concreta, capa real do PDF, três benefícios e botão para a prévia.
2. Oferta que recapitula os seis assuntos presentes no guia antes do preço de R$ 27.
3. Seções de benefícios, para quem é o material e prova visual de páginas do PDF.
4. Limpeza de alegações não verificadas (contagem fixa de vendas "hoje", atualização simulada, depoimentos sem verificação, desconto sem preço anterior comprovado e histórico empresarial de cinco anos não documentado).
5. Passos pós-compra claros. Não foram anunciados bônus extras, pois nenhum material adicional entregue pela Kiwify foi comprovado.

## Operação mantida
- Checkout de pagamento: Kiwify, configurado em `src/lib/tracking.ts`.
- Eventos Meta: `PageView`, `ViewContent` na visualização da oferta, `InitiateCheckout` no botão de compra.
- Preservação de UTMs na passagem para o checkout.
- Garantia informativa de 7 dias.
- Fotos e páginas da versão anterior do material como prévia.

## Desenvolvimento
```bash
bun install
bun run dev
bun run build
```

## Lovable
Projeto de destino solicitado: https://lovable.dev/projects/ee862631-ae9a-4471-9930-a7ef07199461

**Atenção:** este repositório foi criado independentemente no GitHub; alterações no GitHub não modificam automaticamente um projeto Lovable que não esteja conectado a este repositório. A conexão nativa do Lovable geralmente cria um novo repositório na conta autorizada, em vez de importar qualquer repositório externo. Verifique as configurações de Git do projeto. O arquivo `LOVABLE-HANDOFF.md` contém as instruções de adaptação caso seja necessário replicar as alterações no chat do Lovable.

## Comprovações pendentes
- Depoimentos reais e autorização de uso de nomes/fotos.
- Histórico de mais de cinco anos da marca, se houver.
- Indicador dinâmico e verificável de vendas, se desejado.
- Preço anterior real, caso haja desconto.
- Bônus entregues junto ao PDF, caso existam.

Este guia é conteúdo educativo; execução de instalação deve respeitar normas, local, licenças e necessidades de profissional habilitado. Não há promessa de ganhos.
