import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { trimText } from "../utils";

const Container = styled.View`
  width: 50%;
  height: 200px;
  margin-bottom: 70px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 70%;
  height: 70%;
`;

const NameWrapper = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

const Name = styled.Text`
  padding: 3px 0;
`;

export default ({
  imageUrl,
  name,
  brandName,
  originalPrice,
  price,
  prefix,
}) => {
  const navigation = useNavigation();

  const goDetail = () => {
    navigation.navigate("Detail", { prefix });
  };

  const percent = ((originalPrice - price) / originalPrice) * 100;

  return (
    <Container>
      <TouchableOpacity onPress={goDetail}>
        <ImageWrapper>
          <Image source={{ url: imageUrl }} />
        </ImageWrapper>
        <NameWrapper>
          <Name>{brandName}</Name>
          <Name>{trimText(name, 30)}</Name>
          <Name>
            {price.toLocaleString()}{" "}
            <Text style={{ color: "purple" }}>
              {percent !== 0 ? percent.toFixed(2) : percent} %
            </Text>
          </Name>
        </NameWrapper>
      </TouchableOpacity>
    </Container>
  );
};
