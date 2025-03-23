const Categories = ({ categoriesData, categoryName, setCategoryName }) => {
    return (
      <ul className="flex md:flex-col gap-4 text-lg">
        <li
          className={`category-button ${categoryName === "Tümü" ? "selected" : ""}`}
          onClick={() => setCategoryName("Tümü")}
        >
          <span>Tümü</span>
        </li>
        {categoriesData?.map((category) => (
          <li
            key={category}
            className={`category-button ${category === categoryName ? "selected" : ""} group relative`}
            onClick={() => setCategoryName(category)}
          >
            <span>{category}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Categories;
  