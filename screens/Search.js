import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, FlatList, Text } from "react-native";
import ItemList from "../components/ItemList";
import axios from "axios";

const TextInput = styled.TextInput`
  background-color: white;
  margin: 10px 40px 50px 40px;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid black;
`;

const renderItem = ({ item }) => (
  <ItemList
    imageUrl={item.mainImage}
    name={item.name}
    brandName={item.brand.name}
    originalPrice={item.originalPrice}
    price={item.ssomeePrice}
    prefix={item.prefix}
  />
);

const Search = React.memo(() => {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [result, setResult] = useState([]);

  const getData = async (num) => {
    const {
      data: { products },
    } = await axios.get(
      `https://mock-api.ssomee.com/products/all/${num}?order=date-desc`,
    );
    setItems([...items, ...products]);
  };

  const onChange = (text) => setKeyword(text);

  const search = (keyword) => {
    if (keyword.length < 2) {
      Alert.alert("검색어의 길이가 너무 짧습니다.");
    } else {
      const result = items.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.brand.name.toLowerCase().includes(keyword),
      );
      setResult(result);
      console.log(result);
    }
  };

  useEffect(() => {
    for (let page = 1; page < 8; page++) {
      getData(page);
    }
  }, []);

  console.log(items);
  return (
    <>
      <TextInput
        placeholder="검색어를 입력하세요.."
        returnKeyType={"search"}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={onChange}
        onSubmitEditing={() => search(keyword)}
      />
      {result.length > 0 && (
        <FlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.prefix)}
          numColumns={2}
          nestedScrollEnabled={true}
          style={{ backgroundColor: "white" }}
        />
      )}
    </>
  );
});

export default Search;
