import './index.css'

const CategoryItems = ({category, cart, onQuantityChange}) => {
  if (!category.categoryDishes) return null
  return (
    <div>
      <h1 className="category-name">{category.menuCategory}</h1>
      <ul className="items-container">
        {category.categoryDishes.map(dish => {
          const quantity = cart[dish.dishId] || 0

          return (
            <li key={dish.dishId} className="item">
              <div className="item-details">
                <h1>{dish.dishName}</h1>
                <p>{dish.dishDescription}</p>

                <p>
                  {dish.dishCurrency} {dish.dishPrice}
                </p>

                <p>{dish.dishCalories} calories</p>
                {!dish.dishAvailability ? (
                  <p>Not available</p>
                ) : (
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => onQuantityChange(dish.dishId, -1)}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      type="button"
                      onClick={() => onQuantityChange(dish.dishId, 1)}
                    >
                      +
                    </button>
                  </div>
                )}
                {dish.addonCat && dish.addonCat.length > 0 ? (
                  <p>Customizations available</p>
                ) : null}
              </div>
              <img src={dish.dishImage} alt={dish.dishName} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryItems
