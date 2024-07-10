import './index.css'

const Carousel = ({menuCategories, onSlideChange, selectedCategoryIndex}) => (
  <ul className="carousel">
    {menuCategories.map((category, index) => (
      <li key={menuCategories.menuCategoryId}>
        <button
          type="button"
          onClick={() => onSlideChange(index)}
          className={selectedCategoryIndex === index ? 'active' : ''}
        >
          {category.menuCategory}
        </button>
      </li>
    ))}
  </ul>
)

export default Carousel
