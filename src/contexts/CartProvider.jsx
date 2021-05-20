import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(
    () => Number(localStorage.getItem("cartCount")) || 0
  )
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || {}
  )

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartCount, cartItems])

  const addToCart = (id, title, price) => {
    setCartItems((item) => {
      if (!item[id]) {
        item[id] = {
          quantity: 1,
          title,
          price,
        }
      } else {
        item[id].quantity += 1
      }
      setCartCount(
        Object.keys(item)
          .map((id) => item[id].quantity)
          .reduce((a, b) => a + b)
      )
      return item
    })
  }

  const removeItem = (id) => {
    setCartItems((item) => {
      if (item[id] && item[id].quantity === 1) {
        delete item[id]
      } else if (item[id]) {
        item[id].quantity -= 1
      } else {
        setCartCount(0)
        return {}
      }
      setCartCount(
        Object.keys(item)
          .map((id) => item[id].quantity)
          .reduce((a, b) => a + b)
      )
      return item
    })
  }

  const clearCart = () => {
    setCartCount(0)
    setCartItems({})
  }

  return (
    <CartContext.Provider
      value={{ addToCart, cartCount, cartItems, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
