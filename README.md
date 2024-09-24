
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

3. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o TSC:
   ```bash
   tsc
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará rodando em `http://127.0.0.1:3000`.

## Uso

A API permite buscar laptops filtrando por marca. Basta enviar uma requisição GET para o endpoint apropriado.

## Endpoints

### `GET /:brand`

- **Parâmetro:** `brand` (string) - A marca do laptop que deseja buscar.
- **Resposta:**
    - `200 OK` - Retorna uma lista de laptops correspondentes à marca especificada.
    - `400 Bad Request` - Se a marca não for especificada.

## Exemplo de Uso

Para buscar laptops da marca **Lenovo**, você deve fazer uma requisição para:

```
http://127.0.0.1:3000/Lenovo
```

A resposta será um JSON com uma lista de laptops que contêm "Lenovo" no título. Aqui está um exemplo da resposta:

```json
[
    {
      "description": "Lenovo V110-15IAP, 15.6 HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home"
      "imageUrl": "/images/test-sites/e-commerce/items/cart2.png",
      "price": 321.94,
      "title": "Lenovo V110-15..."
    },
    {
      "description": "Asus VivoBook 15 X540NA-GQ008T Chocolate Black, 15.6 HD, Pentium N4200, 4GB, 500GB, Windows 10 Home, En kbd"
      "imageUrl": "/images/test-sites/e-commerce/items/cart2.png",
      "price": 356.49,
      "title": "Lenovo V110-15..."
    }
]
```