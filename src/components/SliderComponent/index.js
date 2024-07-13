import './index.css'

const Carousel = props => {
  const {menuCategories, onSlideChange, selectedCategoryIndex} = props
  return (
    <ul className="carousel">
      {menuCategories.map((category, index) => (
        <li
          key={category.menuCategoryId}
          onClick={() => onSlideChange(index)}
          className={selectedCategoryIndex === index ? 'active' : ''}
        >
          <button type="button" className="category-btn">
            {category.menuCategory}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Carousel
