import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Widget from "./widget";
import { addWidget, setSearchQuery } from "../redux/dashboardSlice";
import { mobile } from "../responsive";

// Styled components
const DashboardContainer = styled.div`
  padding: 20px;
  width: 1000px;
  margin: 0 auto;

  ${mobile({
    width: "100%", 
    padding: "10px", 
  })};
`;

const CategoryContainer = styled.div`
  margin-bottom: 30px;

  ${mobile({
    marginBottom: "20px", 
  })};
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({
    fontSize: "1.5rem", 
    flexDirection: "column", 
    alignItems: "flex-start",
  })};
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

  ${mobile({
    width: "100%", 
    padding: "10px",
    marginTop: "10px", 
  })};
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  ${mobile({
    flexDirection: "column", 
    gap: "10px",
  })};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;

  ${mobile({
    padding: "8px", // Reduce padding on mobile
  })};
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, searchQuery } = useSelector((state) => state.dashboard);

  // Local state to keep track of the widget ID counter
  const [widgetIdCounter, setWidgetIdCounter] = useState(2);

  const handleAddWidget = (categoryName) => {
    // Generate a new unique integer ID
    const newWidgetId = widgetIdCounter + 1;
    setWidgetIdCounter(newWidgetId);

    // Create a new widget with the unique integer ID
    const newWidget = {
      id: newWidgetId,
      name: `New Widget ${newWidgetId}`,
      text: `Random widget text ${newWidgetId}`,
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
