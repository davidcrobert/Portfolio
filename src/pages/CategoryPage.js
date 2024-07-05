import React from 'react';
import Category from '../components/Category';

const CategoryPage = ({ categoryData }) => {
  return (
    <Category
      title={categoryData.title}
      subtitle1={categoryData.subtitle1}
      subtitle2={categoryData.subtitle2}
      projects={categoryData.projects}
    />
  );
};

export default CategoryPage;