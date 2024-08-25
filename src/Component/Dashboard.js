// src/Dashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Widget from './widget';
import { addWidget , setSearchQuery } from '../redux/dashboardSlice';

// Styled components
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const CategoryContainer = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #357ab8;
  }
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, searchQuery } = useSelector((state) => state.dashboard);

  const handleAddWidget = (categoryName) => {
    // Generate a random number once
    const randomNumber = Math.floor(Math.random() * 20); // Random number between 0 and 19
  
    // Create a new widget using the same random number
    const newWidget = {
      id: randomNumber, // Use the random number as the ID
      name: `New Widget ${randomNumber}`, // Use the random number in the name
      text: `Random widget text  ${randomNumber}`, // Use the random number in the text
    };
  
    dispatch(addWidget({ categoryName, newWidget }));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <DashboardContainer>
      <SearchInput
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredCategories.map((category) => (
        <CategoryContainer key={category.name}>
          <CategoryTitle>
            {category.name}
            <AddButton onClick={() => handleAddWidget(category.name)}>
              + Add Widget
            </AddButton>
          </CategoryTitle>
          <WidgetsContainer>
            {category.widgets.map((widget) => (
              <Widget key={widget.id} widget={widget} />
            ))}
          </WidgetsContainer>
        </CategoryContainer>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
