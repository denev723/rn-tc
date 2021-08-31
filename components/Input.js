import React from "react";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  background-color: white;
  margin: 10px 40px 50px 40px;
  padding: 10px;
  border-radius: 50%;
`;

const Input = ({ placeholder, onChange, onSubmit }) => (
  <TextInput
    placeholder={placeholder}
    returnKeyType={"search"}
    autoCorrect={false}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
  />
);

export default Input;
