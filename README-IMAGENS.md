README - Imagens do Catálogo (YESU)
=================================

Este README explica de forma direta onde salvar as imagens dos produtos, quais nomes usar e em quais arquivos/components você deve mexer caso queira que a imagem apareça na interface.

- Pasta onde salvar

  - Local recomendado (Next.js public):

    `public/images/products/[produto-slug]/`

  - Exemplo de estrutura recomendada:

    ```
    public/
    └── images/
        └── products/
            └── produto-slug/
                ├── cover.jpg        # IMAGEM PRINCIPAL (hero / OG)
                ├── thumb.jpg        # MINIATURA (card do catálogo)
                ├── gallery-1.jpg    # GALERIA (opcional)
                ├── gallery-2.jpg
                └── ...
    ```

  - Observações:
    - Não inclua `public` no caminho salvo em `src/lib/data/products.ts`. O caminho público deve começar com `/images/...`.
    - Use nomes e letras minúsculas consistentes (slugs case-sensitive em produção).
    - Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` (mas o nome no `products.ts` deve bater com a extensão que você subir).

- Convenção de nomes (padrão do projeto)

  - `cover.jpg`  -> imagem principal do produto. Usada para hero e Open Graph (preview).
  - `thumb.jpg`  -> miniatura para cards no catálogo.
  - `gallery-1.jpg`, `gallery-2.jpg`, ... -> imagens adicionais da galeria.
  - Alternativa para galeria: uma subpasta `gallery/` com `01.jpg`, `02.jpg` (desde que os caminhos no `products.ts` apontem para esses arquivos).

- Onde o caminho é definido (quando adicionar/editar produtos)

  - Abra: `src/lib/data/products.ts`
  - Cada produto tem campos:

    - `coverImage: string`       // ex.: `"/images/products/yesu-urban-pro/cover.jpg"`
    - `galleryImages: string[]`  // ex.: `[
                                   "/images/products/yesu-urban-pro/gallery-1.jpg",
                                   "/images/products/yesu-urban-pro/gallery-2.jpg",
                                 ]`
    - `thumbnail: string`        // ex.: `"/images/products/yesu-urban-pro/thumb.jpg"`

  - Padronize todos os caminhos para começar com `/images/products/...` (não usar `./images` nem `/public/images`).

- Em quais componentes modificar / onde as imagens são usadas

  - `src/components/sections/CatalogSection.tsx`
    - Componente: `ProductCard`
    - Função: cartão do catálogo (lista/landing). Atualmente o cartão mostra um placeholder com o caminho esperado (texto).
    - O que editar para mostrar a miniatura: substituir o bloco placeholder pela tag `<img>` ou `next/image` usando `product.thumbnail` (ou `product.coverImage` como fallback).

    Exemplo mínimo (substituir o placeholder):

    ```tsx
    // dentro do ProductCard, imagem do card
    <div className="relative h-72 overflow-hidden">
      <img
        src={product.thumbnail || product.coverImage}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    ```

  - `src/app/produtos/[slug]/ProductPageClient.tsx`
    - Função: página de detalhes do produto (hero + galeria).
    - Atualmente o hero e as thumbs usam placeholders; para mostrar imagens substitua o placeholder do hero por `product.galleryImages[galleryIdx]` ou `product.coverImage` e renderize as thumbnails com `product.galleryImages.map(...)`.

    Exemplo mínimo para o hero:

    ```tsx
    <div className="relative aspect-square rounded-3xl overflow-hidden">
      <img
        src={product.galleryImages[galleryIdx] || product.coverImage}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    ```

    Exemplo mínimo para as thumbs da galeria:

    ```tsx
    <div className="grid grid-cols-4 gap-3">
      {product.galleryImages.map((src, i) => (
        <button key={i} onClick={() => setGalleryIdx(i)}>
          <img src={src} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover rounded-xl" />
        </button>
      ))}
    </div>
    ```

  - `src/app/produtos/[slug]/page.tsx`
    - Este arquivo usa `product.coverImage` para preencher `metadata.openGraph.images` — por isso é importante que `coverImage` aponte corretamente para a imagem pública.

- Checklist rápido ao criar um novo produto

  1. Criar pasta: `public/images/products/SEU-SLUG/` (usando o slug que está em `products.ts`).
  2. Colocar pelo menos `cover.jpg` e `thumb.jpg` nessa pasta.
  3. Se quiser galeria, adicionar `gallery-1.jpg`, `gallery-2.jpg`, ...
  4. Abrir `src/lib/data/products.ts` e no objeto do produto atribuir os caminhos corretos (ex.: `"/images/products/SEU-SLUG/cover.jpg"`).
  5. (Opcional) Se quiser que as imagens apareçam imediatamente no site, implementar a renderização nas components mencionadas (CatalogSection e ProductPageClient) — atualmente eles mostram placeholders.

- Observações finais / problemas comuns

  - No repositório atual havia inconsistências nos caminhos (ex.: `"/public/images/..."`, `"./images/..."`) — padronize para `"/images/..."`.
  - Se os nomes dos arquivos não corresponderem (ex.: `cover-jpeg.jpeg` vs `cover.jpg`) o caminho no `products.ts` deve ser atualizado para bater com o arquivo real.
  - Em ambiente Linux/produção o nome dos arquivos é case-sensitive — use nomes minúsculos para evitar problemas.

Se quiser, posso: padronizar os caminhos em `src/lib/data/products.ts` ou adicionar a renderização de imagens nos components — me diga qual ação prefere que eu execute.

O que eu fiz agora (passo a passo)
1. Verifiquei a pasta: `public/images/products/yesu-urban-pro` e listei os arquivos presentes.
2. Atualizei `src/lib/data/products.ts` no objeto do produto `yesu-urban-pro` para que `galleryImages` aponte apenas para as imagens que já existem (no caso, `gallery-1.jpg`).
3. Não alterei `coverImage` nem `thumbnail` porque os arquivos `cover.jpg` e `thumb.jpg` já existem com esses nomes e extensões.

Como replicar esses passos para qualquer outro produto
1. Copie as imagens para `public/images/products/SEU-SLUG/` usando nomes padronizados: `cover.jpg`, `thumb.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, ...
2. Abra `src/lib/data/products.ts` e localize o produto pelo campo `slug`.
3. Atualize os campos:
   - `coverImage` para `"/images/products/SEU-SLUG/cover.jpg"`
   - `thumbnail` para `"/images/products/SEU-SLUG/thumb.jpg"`
   - `galleryImages` para conter apenas os arquivos que você realmente enviou, ex.:

```ts
galleryImages: [
  "/images/products/SEU-SLUG/gallery-1.jpg",
  "/images/products/SEU-SLUG/gallery-2.jpg",
],
```

4. Salve o arquivo. Se estiver rodando o Next.js em modo de desenvolvimento o site deve recarregar e passar a usar as novas imagens.
5. Caso não veja as imagens no site:
   - Verifique o console do navegador para erros 404 (arquivo não encontrado).
   - Confirme que os nomes/ extensões batem exatamente (ex.: `cover-jpeg.jpeg` não é o mesmo que `cover.jpg`).
   - Confirme que os caminhos em `products.ts` começam com `/images/...` (não `public/images` nem `./images`).

Se quiser, faço também a atualização dos components (CatalogSection / ProductPageClient) para renderizarem as imagens automaticamente a partir dos campos `thumbnail`, `coverImage` e `galleryImages`.





Pra alterar o conteudo dos cards na Section CatalogSection.tsx basta editar o arquivo src/lib/data/products.ts e alterar os campos de acordo com a imagem do produto.

Pra alterar o slug basta acessar o arquivo src/lib/data/products.ts e alterar o campo "slug" do produto que deseja alterar.

Passo a passo para criar um novo modelo:
1 - Duplicar um dos modelos existentes em src/lib/data/products.ts:
{
    id: "1",
    slug: "yesu-urban-pro",
    name: "YESU Urban Pro",
    tagline: "A cidade é sua pista.",
    description:
      "Scooter elétrica urbana de alto desempenho. Design premium, tecnologia avançada e autonomia para enfrentar o dia a dia da cidade com eficiência e estilo.",
    longDescription:
      "A YESU Urban Pro foi projetada para quem não abre mão de estilo e eficiência. Com motor brushless de 2.000W, bateria de lítio de 72V e autonomia de até 80km, ela é a escolha certa para o dia a dia urbano. Sistema de recuperação de energia regenerativa, display LCD inteligente e conectividade Bluetooth para monitoramento via app. Freios a disco hidráulicos nas duas rodas garantem segurança total.",
    price: 8990,
    priceInstallment: 299,
    installments: 30,
    category: "urban",
    badge: "Mais Vendida",
    badgeColor: "#FF6B00",
    color: "#0d0d0d",
    accentColor: "#FF6B00",
    // ⚠️ INSERIR IMAGEM: public/images/products/yesu-urban-pro/cover.jpg
    coverImage: "/images/products/yesu-urban-pro/cover.jpg",
    // Imagens de galeria — atualizadas para refletir os arquivos existentes
    // Na pasta public/images/products/yesu-urban-pro existem apenas:
    //   - gallery-1.jpg
    //   - cover.jpg
    //   - cover-jpeg.jpeg
    //   - thumb.jpg
    // Portanto aqui deixamos apenas as imagens que já existem. Se adicionar mais
    // arquivos (gallery-2.jpg, etc.) atualize este array.
    galleryImages: [
      "/images/products/yesu-urban-pro/gallery-1.jpg",
    ],
    // ⚠️ INSERIR THUMBNAIL: public/images/products/yesu-urban-pro/thumb.jpg
    thumbnail: "/images/products/yesu-urban-pro/thumb.jpg",
    specs: [
      { label: "Autonomia", value: "80", unit: "km", icon: "battery" },
      { label: "Vel. Máxima", value: "70", unit: "km/h", icon: "gauge" },
      { label: "Motor", value: "2.000", unit: "W", icon: "zap" },
      { label: "Bateria", value: "72V 32Ah", unit: "", icon: "battery-charging" },
      { label: "Carga", value: "4-6", unit: "horas", icon: "clock" },
      { label: "Peso", value: "115", unit: "kg", icon: "weight" },
      { label: "Carga Máx.", value: "150", unit: "kg", icon: "user" },
      { label: "Garantia", value: "1", unit: "ano", icon: "shield" },
    ],
    highlights: [
      "Motor brushless de alta eficiência",
      "Freios a disco hidráulicos duplos",
      "Display LCD colorido inteligente",
      "Conectividade Bluetooth",
      "Recuperação de energia regenerativa",
      "Faróis LED full",
      "Porta USB integrada",
      "Alarme eletrônico",
    ],
    colors: [
      { name: "Preto Absoluto", hex: "#050505" },
      { name: "Branco Ártico", hex: "#F5F5F5" },
      { name: "Cinza Metálico", hex: "#8A8A8A" },
    ],
    whatsappMessage:
      "Olá! Tenho interesse na YESU Urban Pro. Gostaria de mais informações sobre preço e disponibilidade.",
    featured: true,
    order: 1,
  },

2 - Alterar:
Id de forma sequencial
Slug de acordo com o nome do produto ( padrão yesu-NomeProduto)
Name de acordo com o nome do produto ( padrão "YESU NomeProduto")
Tagline de acordo com a tagline do produto ( padrão "Tagline do produto")
Description de acordo com a descrição do produto ( padrão "Descrição do produto")
LongDescription de acordo com a descrição longa do produto ( padrão "Descrição longa do produto")
Price de acordo com o preço do produto ( padrão preço do produto)
PriceInstallment de acordo com o preço parcelado do produto ( padrão preço parcelado do produto)
INSTALLMENTS de acordo com o número de parcelas do produto ( padrão 30 parcelas)
CATEGORY de acordo com a categoria do produto (padrão "urban")
BADGE de acordo com o badge do produto (opcional)
BADGECOLOR de acordo com a cor do badge do produto (opcional)
COLOR de acordo com a cor do produto (padrão "#0d0d0d")
ACCENTCOLOR de acordo com a cor de destaque do produto (padrão "#FF6B00")
COVERIMAGE de acordo com a imagem de capa do produto (padrão public/images/products/SLUG/cover.jpg)
GALLERYIMAGES de acordo com as imagens de galeria do produto (padrão public/images/products/SLUG/gallery-1.jpg)
THUMBNAIL de acordo com a thumbnail do produto (padrão public/images/products/SLUG/thumb.jpg)
SPECS de acordo com as especificações do produto (padrão specs do produto)
HIGHLIGHTS de acordo com os destaques do produto (padrão highlights do produto)
COLORS de acordo com as cores do produto (padrão colors do produto)
WHATSAPPMessage de acordo com a mensagem de whatsapp do produto (padrão "Olá! Tenho interesse na [Nome do Produto]. Gostaria de mais informações sobre preço e disponibilidade.")
FEATURED 
ORDER 
  

Substituir Numero do Whatsapp:
src/lib/utils.ts na linha 39
export const WHATSAPP_NUMBER = "55000000000000"; // ⚠️ SUBSTITUA pelo número real da YESU Brasil

src\app\layout.tsx
Linha 132

Alterar informações de telefone, e-mail e endereço no footer do catalogo


Alterar modelos no footer de acordo com os modelos corretos:
src/components/layout/Footer.tsx
const footerLinks


Alterar os links na coluna empresa no footer



criar tbm novas cores pra quando o user trocar a cor no catalogo ele visualizar imagem de cor diferente pra que ele trocou direto

otimizar as imagens
transformar para webp











NavBar:
Pra alterar algo no NavBar basta acessar src\components\layout\Navbar.tsx
Pra mudança de qualquer número de telefone que esteja no href de um botão ou link basta acessar src\lib\utils.ts e alterar o const WHATSAPP_NUMBER


Section Hero:
Pra alterar algo no hero basta acessar src\components\hero\HeroSection.tsx 
