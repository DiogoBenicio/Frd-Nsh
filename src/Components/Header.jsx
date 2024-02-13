import { useState } from 'react';
import { AppBar, Toolbar, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/**
 * Componente Header que exibe a barra superior do aplicativo com opções de navegação.
 *
 * Este componente cria uma AppBar que contém o logo do aplicativo, um botão para acessar a lista de desejos
 * e um menu de usuário que se expande para mostrar opções relacionadas à conta do usuário.
 */
const Header = () => {
  // Estado para controlar a âncora do menu do usuário. Null significa que o menu está fechado.
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  // Calcula um booleano para verificar se o menu do usuário está aberto.
  const isMenuOpen = Boolean(anchorElUser);

  /**
   * Manipula a abertura do menu do usuário.
   * 
   * @param {Object} event O evento que disparou a abertura do menu.
   */
  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Fecha o menu do usuário.
   */
  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#5A2D82' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo do aplicativo */}
          <img src="../../public/Images/netshoes-logo.png" alt="Netshoes Logo" style={{ height: '20px', marginRight: 'auto' }} />
          
          {/* Botão da lista de desejos com ícone e texto */}
          <IconButton color="inherit" aria-label="open wishlist" href="/wishlist" sx={{ marginRight: 4 }}>
            <FavoriteIcon />
            <Typography variant="body2" component="span" sx={{ marginLeft: '5px' }}>
              Wishlist
            </Typography>
          </IconButton>
          
          {/* Botão do menu do usuário que se expande para mostrar opções relacionadas à conta do usuário */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            color="inherit"
            sx={{ fontSize: '2rem' }}
          >
            <AccountCircleIcon sx={{ fontSize: 'inherit' }} />
          </IconButton>
          
          {/* Menu que se expande a partir do botão do usuário, contendo várias opções */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Entrar</MenuItem>
            <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem>
            <MenuItem onClick={handleMenuClose}>Endereços</MenuItem>
            <MenuItem onClick={handleMenuClose}>Minha Netshoes</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
