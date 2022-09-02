import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((key) => {
        const product = categoriesMap[key];

        return <CategoryPreview key={key} title={key} products={product} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
