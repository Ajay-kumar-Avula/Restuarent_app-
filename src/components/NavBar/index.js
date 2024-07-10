import {RiShoppingCart2Line} from 'react-icons/ri'
import './index.css'

const NavBar = props => {
  const {cartCount} = props

  return (
    <div className="navContainer">
      <h1 className="heading">UNI Resto Cafe</h1>
      <div className="cartContainer">
        <p>My Orders</p>
        <RiShoppingCart2Line className="cart" />
        <p className="cartCount">{cartCount}</p>
      </div>
    </div>
  )
}

export default NavBar
