import {Component} from 'react'
import Carousel from '../SliderComponent'
import CategoryItems from '../CategoryItems'
import NavBar from '../NavBar'
import './index.css'

class Home extends Component {
  state = {
    menuCategories: [],
    selectedCategoryIndex: 0,
    cart: {},
    cartCount: 0,
  }

  componentDidMount() {
    this.getMenuDetails()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachItem => ({
        dishId: eachItem.dish_id,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
        dishImage: eachItem.dish_image,
        dishCurrency: eachItem.dish_currency,
        dishCalories: eachItem.dish_calories,
        dishDescription: eachItem.dish_description,
        dishAvailability: eachItem.dish_Availability,
        dishType: eachItem.dish_type,
        addonCat: eachItem.addonCat,
      })),
    }))

  getMenuDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {method: 'GET'}

    try {
      const fetchUrl = await fetch(url, options)
      if (!fetchUrl.ok) {
        throw new Error('Network response was not ok')
      }
      const response = await fetchUrl.json()
      console.log(response)
      const updatedData = this.getUpdatedData(response[0].table_menu_list)
      this.setState({menuCategories: updatedData})
    } catch (error) {
      console.error('Fetching failed:', error)
    }
  }

  handleSlideChange = index => {
    this.setState({selectedCategoryIndex: index})
  }

  handleQuantityChange = (dishId, change) => {
    this.setState(prevState => {
      const updatedCart = {...prevState.cart}
      const currentQuantity = updatedCart[dishId] || 0
      const newQuantity = currentQuantity + change

      if (newQuantity <= 0) {
        delete updatedCart[dishId]
      } else {
        updatedCart[dishId] = newQuantity
      }

      const updatedCartCount = Object.values(updatedCart).reduce(
        (total, quantity) => total + quantity,
        0,
      )

      return {
        cart: updatedCart,
        cartCount: updatedCartCount,
      }
    })
  }

  render() {
    const {menuCategories, selectedCategoryIndex, cart, cartCount} = this.state
    const selectedCategory = menuCategories[selectedCategoryIndex] || {}

    return (
      <div>
        <NavBar cartCount={cartCount} />

        <Carousel
          menuCategories={menuCategories}
          onSlideChange={this.handleSlideChange}
          selectedCategoryIndex={selectedCategoryIndex}
        />

        <CategoryItems
          category={selectedCategory}
          cart={cart}
          onQuantityChange={this.handleQuantityChange}
        />
      </div>
    )
  }
}

export default Home
