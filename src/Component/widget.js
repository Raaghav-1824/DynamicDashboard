// src/Widget.js
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeWidget } from '../redux/dashboardSlice';

// Styled components
const WidgetContainer = styled.div`
  background-color: #F5F7F8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;
const WidgetTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const WidgetText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  background-color: #e94e4e;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d43b3b;
  }
`;

const Widget = ({ widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ widgetId: widget.id }));
  };

  return (
    <WidgetContainer>
      <WidgetTitle>{widget.name}</WidgetTitle>
      <WidgetText>{widget.text}</WidgetText>
      <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
    </WidgetContainer>
  );
};

export default Widget;
