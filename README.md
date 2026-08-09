# Pluvion — Landing Page

Landing page institucional do projeto **Pluvion**, construída em HTML5, CSS3 e JavaScript moderno (sem frameworks).

> **Pluvion** é a marca/ecossistema. **SAE — Sistema de Alerta de Enchentes e Alagamentos** é o dispositivo físico. Os dois nomes não são intercambiáveis.

## Objetivo

Apresentar o Pluvion como solução real de monitoramento e alerta de enchentes/alagamentos: o problema, a pesquisa de campo, como o sistema funciona, a tecnologia do SAE, a escala de risco, a proposta para instituições, os criadores e as produções do projeto.

## Tecnologias

- HTML5 semântico
- CSS3 modular (variáveis, sem framework)
- JavaScript ES6 modular (sem build step, `<script type="module">`)
- [Chart.js](https://www.chartjs.org/) via CDN, para os gráficos da pesquisa de campo

## Estrutura de pastas

```
pluvion-landing-page/
├── index.html
├── css/
│   ├── reset.css            # normalização base
│   ├── variables.css        # tokens de cor, tipografia, espaçamento
│   ├── typography.css       # hierarquia tipográfica
│   ├── components.css       # botões, cards, badges, formulário
│   ├── header.css / hero.css / problema.css / pesquisa.css /
│   │   como-funciona.css / tecnologia.css / risco.css /
│   │   instituicoes.css / criadores.css / producoes.css / footer.css
│   └── responsive.css       # ajustes globais de responsividade
├── js/
│   ├── main.js               # ponto de entrada, inicializa os módulos
│   ├── navigation.js         # menu, scroll, estado ativo
│   ├── animations.js         # reveal on scroll (IntersectionObserver)
│   ├── carousel.js           # carrossel de notícias
│   ├── charts.js             # gráficos da pesquisa de campo (Chart.js)
│   ├── institutional-form.js # fluxo do formulário institucional
│   ├── form-validation.js    # regras de validação reutilizáveis
│   └── config.js             # endpoint, placeholders, configurações
├── images/
│   ├── news/       # imagens do carrossel de notícias
│   ├── creators/   # fotos dos 5 integrantes
│   ├── device/      # imagens do dispositivo SAE
│   ├── pitch/       # capa/pôster do vídeo pitch
│   └── general/     # favicon, marca, imagem de compartilhamento (og-image)
└── README.md
```

## Como abrir

Como o JavaScript usa módulos ES6 (`type="module"`), abrir o `index.html` diretamente via `file://` pode ser bloqueado pelo navegador. Sirva a pasta com um servidor estático simples:

```bash
# Python
python3 -m http.server 8080

# Node (http-server)
npx http-server -p 8080
```

Depois acesse `http://localhost:8080`.

## Como substituir conteúdo placeholder

Tudo que ainda não é definitivo está claramente identificado no código (comentários `SUBSTITUIR` ou textos "a definir"). Nada foi inventado como se fosse informação real.

### Imagens de notícias
Troque os arquivos em `images/news/` pelas imagens reais e atualize, em `index.html`, dentro de `.news-carousel`, os campos de cada `.news-card`: imagem (`src`/`alt`), veículo, data, título, resumo e link (`href`).

### Dados da pesquisa de campo
Em `js/charts.js`, edite o objeto `researchData` no topo do arquivo com os valores reais (labels e valores). Os números exibidos nos cartões de estatística (`.stat-card__value`) ficam em `index.html`, na seção `#pesquisa`.

### Endpoint do formulário institucional
Em `js/config.js`, preencha `institutionalRequestEndpoint` com a URL da Cloud Function/endpoint responsável por validar e registrar a solicitação no backend. Enquanto vazio, o formulário informa ao usuário que o envio não está disponível — nunca simula uma aprovação.

### Integrantes (Criadores)
Em `index.html`, seção `#criadores`, substitua em cada `.creator-card`: foto (`images/creators/`), nome, função, descrição e links de redes sociais.

### Vídeo pitch e monografia
Em `js/config.js`, preencha `pitchVideoUrl` (URL do vídeo) e `monographUrl` (caminho do PDF). Enquanto vazios, os links da seção `#producoes` ficam desabilitados em vez de apontar para um destino inexistente. A capa do vídeo pode ser substituída em `images/pitch/`.

### Especificações técnicas do SAE
Em `index.html`, seção `#tecnologia`, os `.spec-item` refletem a arquitetura atual (ESP32, sensor ultrassônico, Wi-Fi/HTTPS, solar + bateria, OTA). Ajuste apenas se a arquitetura real mudar — não copie as especificações antigas do protótipo (Arduino/LoRa), que estão desatualizadas.

## Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Hierarquia de headings consistente
- Foco visível em todos os elementos interativos
- Navegação por teclado no carrossel e no menu mobile (incluindo `Escape`)
- `prefers-reduced-motion` respeitado nas animações
- `alt` descritivo em todas as imagens, incluindo placeholders

## Performance

- CSS e JS modulares, carregados apenas uma vez
- Chart.js carregado sob demanda (apenas quando a seção de gráficos existe)
- Imagens com `loading="lazy"` fora do viewport inicial
- Sem dependências além de Chart.js (via CDN)
