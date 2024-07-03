import React from 'react';
import KingInput from '../../../shared/input/Input';
import PriceFilter from '../../priceFilter/PriceFilter';
import CategoryFilter from '../../categoryFilter/CategoryFilter';
import KingDropdown from '../../../shared/dropdown/Dropdown';


const ShopControls = ({ titleFilter, setTitleFilter, selectedPrice, setSelectedPrice, selectedCategories, setSelectedCategories, sortOption, setSortOption, categories, error }) => {
  const sortOptions = [
    { label: 'cijena (uzlazno)', value: 'price-ascending' },
    { label: 'cijena (silazno)', value: 'price-descending' },
    { label: 'naslov (A-Z)', value: 'title-ascending' },
    { label: 'naslov (Z-A)', value: 'title-descending' },
  ];

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleCategoryChange = (value) => {
    const selCategories = [...selectedCategories];
    if (selCategories.includes(value)) {
      const index = selCategories.indexOf(value);
      selCategories.splice(index, 1);
    } else {
      selCategories.push(value);
    }
    setSelectedCategories(selCategories);
  };

  return (
    <form>
      <div className="shop-controls">
        <KingInput
          className="search-input"
          placeholder="Pretraži"
          value={titleFilter}
          onChange={handleTitleFilterChange}
          errorMessage={error}
        />
        <div className="control">
          <span>Cijena</span>
          <PriceFilter selectedPrices={selectedPrice} onPriceChange={handlePriceChange} />
        </div>
        <div className="control">
          <span>Kategorije</span>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <KingDropdown
          className="sort-control"
          label="Sortiraj"
          options={sortOptions}
          value={sortOption}
          onChange={handleSortChange}
        />
      </div>
    </form>
  );
};

export default ShopControls;
