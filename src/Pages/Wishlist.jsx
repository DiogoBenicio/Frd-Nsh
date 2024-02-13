import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CssBaseline, Grid, Container, Tab, Tabs, Box } from '@mui/material';
import Header from '../Components/Header';
import ProductCard from '../Components/Card';

/**
 * Componente Wishlist para exibir a lista de desejos do usuário.
 *
 * Responsável por renderizar a lista de produtos adicionados à lista de desejos pelo usuário.
 * Inclui funcionalidades para buscar a lista de desejos da API e remover produtos dessa lista.
 */
const Wishlist = () => {
  // Estado para armazenar a lista de desejos obtida da API.
  const [wishlist, setWishlist] = useState([]);
  // Estado para controlar o valor da tab selecionada na barra de navegação.
  const [value, setValue] = useState(1); // Inicializado como 1, assumindo que a Wishlist é a segunda tab.

  // Efeito para buscar a lista de desejos ao montar o componente.
  useEffect(() => {
    axios.get('/api/wishlist')
      .then(response => {
        // Adiciona a propriedade isWishlisted a cada item para controle de estado no componente ProductCard.
        setWishlist(response.data.map(item => ({ ...item, isWishlisted: true })));
      })
      .catch(error => console.error('Erro ao buscar lista de desejos:', error));
  }, []);

  /**
   * Função para atualizar a tab selecionada.
   * @param {Object} event - O evento que disparou a mudança.
   * @param {number} newValue - O novo valor do índice da tab.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * Função para remover um produto da lista de desejos.
   * @param {string} productId - ID do produto a ser removido da lista de desejos.
   */
  const removeFromWishlist = (productId) => {
    axios.delete('/api/wishlist/remove', { data: { productId } })
      .then(() => {
        // Atualiza o estado da lista de desejos, removendo o produto especificado.
        setWishlist(wishlist.filter(item => item.selectedProduct !== productId));
      })
      .catch(error => console.error('Erro ao remover produto da lista de desejos:', error));
  };

  return (
    <React.Fragment>
      <CssBaseline /> {/* Normalize o CSS para manter a consistência entre navegadores. */}
      <Header /> {/* Componente de cabeçalho, inclui a AppBar. */}
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {/* Box para a barra de navegação com tabs. */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={value} onChange={handleChange} aria-label="navigation tabs" sx={{
            '.MuiTab-root': {
              fontWeight: 'bold', // Deixa o texto das tabs em negrito.
            },
            '.MuiTabs-indicator': {
              backgroundColor: '#5A2D82', // Define a cor do indicador da tab selecionada.
            }
          }}>
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Wishlist" component={Link} to="/wishlist" />
          </Tabs>
        </Box>
        {/* Grid para exibir a lista de desejos como cartões de produtos. */}
        <Grid container spacing={2} justifyContent="center">
          {wishlist.map(item => (
            <Grid item key={item.selectedProduct} xs={12} sm={6} md={4} lg={3}>
              {/* Passa as propriedades do produto para o componente ProductCard. */}
              <ProductCard
                product={item}
                isWishlisted={true}
                onRemoveFromWishlist={removeFromWishlist}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Wishlist;
