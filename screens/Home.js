import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import axios from "axios";
import ItemList from "../components/ItemList";
import Categories from "../components/Categories";

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

// 정렬 순서 구현

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("date-desc");

  const getData = async () => {
    try {
      if (page > maxPage) {
        return;
      }
      setLoading(true);
      const {
        data: { maxPage, products },
      } = await axios.get(
        `https://mock-api.ssomee.com/products/all/${page}?order=${selectedValue}`,
      );
      setItems([...items, ...products]);
      setMaxPage(maxPage);
      setPage((prev) => prev + 1);
      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onEndReached = () => {
    if (loading) {
      return;
    } else if (page > maxPage) {
      return;
    } else {
      getData();
    }
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.prefix)}
      numColumns={2}
      ListHeaderComponent={<Categories />}
      ListHeaderComponentStyle={{ backgroundColor: "white" }}
      stickyHeaderIndices={[0]}
      ListFooterComponent={loading && <ActivityIndicator />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      nestedScrollEnabled={true}
      style={{ backgroundColor: "white" }}
    />
  );
}
