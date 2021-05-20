import {
  AppBar,
  Badge,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { HomeOutlined, ShoppingCartOutlined } from "@material-ui/icons"

import { CartContext } from "../contexts/CartProvider"
import { useContext } from "react"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}))

export const Nav = () => {
  const classes = useStyles()
  const history = useHistory()
  const { cartCount } = useContext(CartContext)

  return (
    <AppBar position='sticky'>
      <Container>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Shopda Mall
          </Typography>
          <Button
            color='inherit'
            onClick={() => (window.location.href = "/assignment-1")}>
            Assignment 1
          </Button>
          <IconButton color='inherit' onClick={() => history.push("/")}>
            <HomeOutlined />
          </IconButton>
          <IconButton
            disabled={cartCount === 0}
            color='inherit'
            onClick={() => history.push("/cart")}>
            <Badge badgeContent={cartCount} color='secondary'>
              <ShoppingCartOutlined color='inherit' />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
