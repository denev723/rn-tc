import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  width: 100%;
  height: 400px;
  background-color: white;
`;

const ImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.View`
  margin-top: 10px;
  background-color: white;
  padding: 20px;
`;

const ItemInfoWrapper = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  padding: 20px;
`;

const PurchaseWrapper = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const PurchaseBtn = styled.View`
  padding: 10px 20px;
  background-color: black;
  color: white;
  border-radius: 10px;
  margin-right: 10px;
`;

export default ({
  route: {
    params: { prefix },
  },
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mock-api.ssomee.com/products/${prefix}`,
      );
      setData(data);
      setLoading(false);
    } catch {
      Alert.alert("불러오기 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onPress = () => navigation.navigate("Purchase", { data });

  const percent =
    data.originalPrice &&
    ((data.originalPrice - data.ssomeePrice) / data.originalPrice) * 100;

  const source = {
    html: data.description,
  };

  return loading ? (
    <ActivityIndicator color="black" size="small" />
  ) : (
    <>
      <ScrollView contentContainerStyle={{ width: WIDTH }}>
        <Container>
          <Swiper controlsProps={{ prevTitle: "", nextTitle: "" }}>
            <ImageWrapper key={0}>
              <Image
                resizeMode="stretch"
                source={{ uri: data.mainImage }}
                style={{ width: "100%", height: "100%" }}
              />
            </ImageWrapper>
            {data.detailImages &&
              data.detailImages.map((item) => (
                <ImageWrapper key={item.index + 1}>
                  <Image
                    resizeMode="stretch"
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </ImageWrapper>
              ))}
          </Swiper>
        </Container>
        <InfoWrapper>
          {data.category && (
            <Text>
              {data.category.name} - {data.brand.name}
            </Text>
          )}
          {data.name && <Text>{data.name}</Text>}
          {data.ssomeePrice && (
            <Text>
              {data.ssomeePrice.toLocaleString()}원{" "}
              <Text>{percent !== 0 ? percent.toFixed(2) : percent}%</Text>
            </Text>
          )}
        </InfoWrapper>
        <ItemInfoWrapper>
          <Text>상품정보</Text>
          {data.description && (
            <RenderHTML source={source} contentWidth={WIDTH} />
          )}
        </ItemInfoWrapper>
      </ScrollView>
      <PurchaseWrapper>
        <TouchableOpacity onPress={onPress}>
          <PurchaseBtn>
            <Text style={{ color: "white", fontSize: 15 }}>구매하기</Text>
          </PurchaseBtn>
        </TouchableOpacity>
        <TouchableOpacity>
          <PurchaseBtn>
            <Text style={{ color: "white", fontSize: 15 }}>장바구니</Text>
          </PurchaseBtn>
        </TouchableOpacity>
      </PurchaseWrapper>
    </>
  );
};
