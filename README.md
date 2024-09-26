
# API de Laptops

Esta é uma API simples construída com Node.js e Express que permite buscar informações sobre laptops a partir de uma marca específica. Utiliza web scraping para obter os dados de uma página de comércio eletrônico.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Exemplo de Uso](#exemplo-de-uso)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/ahmedjorge/WebScraperTest.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd WebScraperTest
   ```

3. Instale o TypeScript globalmente (caso ainda não tenha):
   ```bash
   npm install -g typescript
   ```

4. Instale as dependências:
   ```bash
   npm install
   ```

5. Compile o código TypeScript:
   ```bash
   tsc
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará rodando em `http://127.0.0.1:3000`.

## Uso

A API permite buscar laptops filtrando por marca. Basta enviar uma requisição GET ou POST para o endpoint apropriado.

## Endpoints

### `GET /:brand`

- **Parâmetro:** `brand` (string) - A marca do laptop que deseja buscar.
- **Resposta:**
    - `200 OK` - Retorna uma lista de laptops correspondentes à marca especificada.
    - `400 Bad Request` - Se a marca não for especificada.

### `POST /`

- **Corpo da Requisição:** JSON contendo o campo `filter` que representa a marca do laptop que deseja buscar.

  Exemplo:
  ```json
  {
    "filter": "Lenovo"
  }
  ```

- **Resposta:**
    - `200 OK` - Retorna uma lista de laptops correspondentes à marca especificada.
    - `500 Internal Server Error` - Se ocorrer algum erro no processo de busca.

## Exemplo de Uso

### `GET /:brand`

Para buscar laptops da marca **Lenovo**, você deve fazer uma requisição para:

```
http://127.0.0.1:3000/Lenovo
```

A resposta será um JSON com uma lista de laptops que contêm "Lenovo" no título. Exemplo:

```json
[
  {
    "description": "Lenovo V110-15IAP, 15.6 HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home",
    "imageUrl": "https://webscraper.io/images/test-sites/e-commerce/items/cart2.png",
    "price": 321.94,
    "title": "Lenovo V110-15...",
    "link": "/test-sites/e-commerce/static/product/63"
  },
  {
    "description": "Asus VivoBook 15 X540NA-GQ008T Chocolate Black, 15.6 HD, Pentium N4200, 4GB, 500GB, Windows 10 Home, En kbd",
    "imageUrl": "https://webscraper.io/images/test-sites/e-commerce/items/cart2.png",
    "price": 356.49,
    "title": "Lenovo V110-15...",
    "link": "https://webscraper.io/test-sites/e-commerce/static/product/64"
  }
]
```

### `POST /`

Para buscar laptops da marca **Lenovo** usando o método `POST`, envie um JSON contendo o campo `filter` para o seguinte endpoint:

```
POST http://127.0.0.1:3000/
```

Exemplo de corpo da requisição:

```json
{
  "filter": "Lenovo"
}
```

A resposta será um JSON similar ao exemplo anterior, com uma lista de laptops que contêm "Lenovo" no título.