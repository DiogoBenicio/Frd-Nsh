import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CssBaseline, Grid, Container, Tab, Tabs, Box } from '@mui/material';
import Header from '../Components/Header';
import ProductCard from '../Components/Card';

/**
 * Renderiza a página inicial do aplicativo.
 *
 * Este componente é responsável por exibir a AppBar, uma barra de navegação com tabs e uma lista de produtos.
 * Ele busca a lista de produtos da API ao ser montado e permite ao usuário adicionar produtos à lista de desejos.
 */
const Home = () => {
  // Estado para armazenar os produtos obtidos da API.
  const [products, setProducts] = useState([]);
  // Estado para controlar qual tab está ativa.
  const [value, setValue] = useState(0);

  // Efeito para buscar produtos da API na montagem do componente.
  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data.products)) // Atualiza o estado `products` com os produtos recebidos.
      .catch(error => console.error('Erro ao buscar produtos:', error)); // Loga erro no console se a requisição falhar.
  }, []);

  /**
   * Função para adicionar um produto à lista de desejos.
   *
   * @param {string} productId - O ID do produto a ser adicionado à lista de desejos.
   */
  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post('/api/wishlist/add', { productId }); // Requisição para adicionar o produto à lista de desejos.
      alert('Produto adicionado à lista de desejos'); // Alerta de sucesso.
    } catch (error) {
      console.error('Erro ao adicionar produto à lista de desejos:', error); // Loga erro no console.
      alert('Falha ao adicionar produto à lista de desejos'); // Alerta de falha.
    }
  };

  /**
   * Função para mudar a tab ativa.
   *
   * @param {Object} event - O evento que disparou a mudança.
   * @param {number} newValue - O novo índice da tab selecionada.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue); // Atualiza o estado `value` com o novo índice da tab.
  };

  return (
    <React.Fragment>
      <CssBaseline /> {/* Reseta o CSS padrão para garantir consistência entre navegadores. */}
      <Header /> {/* Componente de cabeçalho, inclui a AppBar. */}
      <Container maxWidth="lg" sx={{ mt: 2 }}> {/* Container principal para o conteúdo abaixo da AppBar. */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}> {/* Box para a barra de navegação com tabs. */}
          <Tabs
            value={value} // Valor da tab ativa.
            onChange={handleChange} // Função chamada ao mudar de tab.
            aria-label="navigation tabs"
            sx={{
              '.MuiTab-root': { // Estiliza todas as tabs para terem texto em negrito.
                fontWeight: 'bold',
              },
              '.MuiTabs-indicator': { // Estiliza o indicador da tab ativa.
                backgroundColor: '#5A2D82', // Cor de destaque.
              }
            }}
          >
            <Tab label="Home" component={Link} to="/" /> {/* Tab para a página inicial. */}
            <Tab label="Wishlist" component={Link} to="/wishlist" /> {/* Tab para a lista de desejos. */}
          </Tabs>
        </Box>
        <Grid container spacing={2} justifyContent="center"> {/* Grid para os cartões de produtos. */}
          {products.map(product => (
            <Grid item key={product.selectedProduct} xs={12} sm={6} md={4} lg={3}> {/* Cada produto em um grid item. */}
              <ProductCard product={product} onAddToWishlist={handleAddToWishlist} /> {/* Cartão do produto. */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
