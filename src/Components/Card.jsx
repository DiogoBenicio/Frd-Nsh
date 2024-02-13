import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import CloseIcon from '@mui/icons-material/Close'; 
import StarIcon from '@mui/icons-material/Star'; 
import axios from 'axios';

/**
 * Exibe um cartão de produto com detalhes e funcionalidade de lista de desejos.
 *
 * Este componente renderiza um cartão de produto mostrando detalhes como imagem, nome, avaliação, preço,
 * e um botão de lista de desejos. Permite aos usuários adicionar ou remover o produto de sua lista de desejos.
 *
 * Props:
 *   - product (Objeto): Objeto contendo detalhes do produto. Obrigatório.
 *       - selectedProduct (String): ID do produto selecionado. Necessário para a funcionalidade da lista de desejos.
 *       - product.image (String): URL da imagem do produto.
 *       - name (String): Nome do produto.
 *   - isWishlisted (Boolean): Estado inicial indicando se o produto está na lista de desejos. Padrão é falso.
 *
 * @component
 * @example
 * const product = {
 *   selectedProduct: '123',
 *   product: { image: 'url/para/imagem.jpg' },
 *   name: 'Nome do Produto'
 * };
 * const isWishlisted = true;
 * 
 * <ProductCard product={product} isWishlisted={isWishlisted} />
 */
const ProductCard = ({ product, isWishlisted }) => {

  const [isFavorited, setIsFavorited] = useState(false);

  // Atualiza isFavorited com base na prop isWishlisted quando o componente monta ou quando isWishlisted muda.
  useEffect(() => {
    setIsFavorited(isWishlisted);
  }, [isWishlisted]);

  // Verifica o status na lista de desejos quando o produto selecionado muda.
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await axios.get(`/api/wishlist/check/${product.selectedProduct}`);
        setIsFavorited(response.data.isInWishlist);
      } catch (error) {
        console.error('Erro ao verificar status na lista de desejos:', error);
      }
    };
  
    checkWishlist();
  }, [product.selectedProduct]);
  
  // Alterna o estado de favorito do produto.
  const toggleFavorite = async () => {
    if (isFavorited) {
      try {
        await axios.delete('/api/wishlist/remove', { data: { productId: product.selectedProduct } });
        setIsFavorited(false);
      } catch (error) {
        console.error('Erro ao remover produto da lista de desejos:', error);
      }
    } else {
      try {
        await axios.post('/api/wishlist/add', { productId: product.selectedProduct });
        setIsFavorited(true);
      } catch (error) {
        console.error('Erro ao adicionar produto à lista de desejos:', error);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: 400, m: 0.5, position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} sx={{ color: 'orange' }} />
          ))}
          <Typography sx={{ marginLeft: '5px' }}>5.0</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
          R$250,00
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#5A2D82', fontSize: '1.25rem' }}>
          R$150,00
        </Typography>
      </CardContent>
      <IconButton
        onClick={toggleFavorite}
        sx={{
          color: 'white',
          backgroundColor: isFavorited ? 'red' : 'lightgray',
          '&:hover': { backgroundColor: isFavorited ? 'darkred' : 'rgba(211, 211, 211, 0.8)' },
          borderRadius: '50%',
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        {isWishlisted ? <CloseIcon /> : (isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />)}
      </IconButton>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isWishlisted: PropTypes.bool,
};

export default ProductCard;
