import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  width: 100%;
  height: ${WIDTH / 5}px;
  flex-direction: row;
  margin: 0 20px;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Item = styled.Text``;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("https://mock-api.ssomee.com/categories");
    setCategories(data.filter((item) => item.id !== 0));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Container>
        <Wrapper>
          <TouchableOpacity>
            <Item>전체</Item>
          </TouchableOpacity>
        </Wrapper>
        {categories.map((category) => (
          <Wrapper key={category.id}>
            <TouchableOpacity>
              <Item>{category.name}</Item>
            </TouchableOpacity>
          </Wrapper>
        ))}
      </Container>
    </ScrollView>
  );
}
