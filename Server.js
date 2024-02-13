import express from "express";
import axios from "axios";
import { Client } from "@elastic/elasticsearch";
import bodyParser from "body-parser";

// Inicializa o cliente do Elasticsearch com a URL do cluster.
const client = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

// Cria uma instância do aplicativo Express.
const app = express();

// Middleware para parsear o corpo das requisições JSON.
app.use(bodyParser.json());

/**
 * Rota GET para buscar produtos de uma API externa.
 * Endpoint: /api/products
 * Método: GET
 * Descrição: Busca uma lista de produtos de uma fonte externa e retorna os dados.
 */
app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://run.mocky.io/v3/5ab15ba4-fe75-4a4f-b54c-7efa540e3e3d"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Falha ao buscar produtos" });
  }
});

/**
 * Rota POST para adicionar um produto à wishlist no Elasticsearch.
 * Endpoint: /api/wishlist/add
 * Método: POST
 * Descrição: Recebe um ID de produto e o adiciona à wishlist armazenada no Elasticsearch.
 */
app.post("/api/wishlist/add", async (req, res) => {
  try {
    const { productId } = req.body;
    const response = await client.index({
      index: "wishlist",
      body: {
        productId,
        timestamp: new Date(),
      },
    });

    res.json({ message: "Produto adicionado à wishlist", id: response });
  } catch (error) {
    console.error("Erro ao adicionar produto à wishlist:", error);
    res.status(500).json({ error: "Falha ao adicionar produto à wishlist" });
  }
});

/**
 * Rota GET para verificar se um produto está na wishlist.
 * Endpoint: /api/wishlist/check/:productId
 * Método: GET
 * Descrição: Verifica se um determinado produto (pelo ID) está na wishlist.
 */
app.get("/api/wishlist/check/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await client.search({
      index: "wishlist",
      body: {
        query: {
          match: {
            productId: productId,
          },
        },
      },
    });

    const isInWishlist = response.hits.total.value > 0;
    res.json({ isInWishlist });
  } catch (error) {
    console.error("Erro ao verificar wishlist:", error);
    res.status(500).json({ error: "Falha ao verificar wishlist" });
  }
});

/**
 * Rota GET para buscar produtos da wishlist filtrados.
 * Endpoint: /api/wishlist
 * Método: GET
 * Descrição: Retorna os produtos da wishlist, filtrando-os a partir de uma lista completa de produtos.
 */
app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlistResponse = await client.search({
      index: "wishlist",
      body: {
        query: {
          match_all: {},
        },
      },
      size: 1000,
    });

    const wishlistIds = wishlistResponse.hits.hits.map(
      (hit) => hit._source.productId
    );

    const productsResponse = await axios.get(
      "https://run.mocky.io/v3/5ab15ba4-fe75-4a4f-b54c-7efa540e3e3d"
    );
    const allProducts = productsResponse.data.products;

    const filteredProducts = allProducts.filter((product) =>
      wishlistIds.includes(product.selectedProduct)
    );

    res.json(filteredProducts);
  } catch (error) {
    console.error("Erro ao buscar produtos filtrados da wishlist:", error);
    res.status(500).json({ error: "Falha ao buscar produtos filtrados da wishlist" });
  }
});

/**
 * Rota DELETE para remover um produto da wishlist.
 * Endpoint: /api/wishlist/remove
 * Método: DELETE
 * Descrição: Remove um produto especificado pelo ID da wishlist no Elasticsearch.
 */
app.delete("/api/wishlist/remove", async (req, res) => {
  try {
    const { productId } = req.body;
    await client.deleteByQuery({
      index: "wishlist",
      body: {
        query: {
          match: {
            productId: productId,
          },
        },
      },
    });

    res.json({
      message: "Produto removido da wishlist",
      productId: productId,
    });
  } catch (error) {
    console.error("Erro ao remover produto da wishlist:", error);
    res.status(500).json({ error: "Falha ao remover produto da wishlist" });
  }
});

// Define a porta e inicia o servidor.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
