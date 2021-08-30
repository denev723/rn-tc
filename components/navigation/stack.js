import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import Detail from "../../screens/Detail";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Search from "../../screens/Search";

const Stack = createStackNavigator();

export default () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="소미 마켓"
        component={Home}
        options={{
          headerRight: () => (
            <Button
              title="검색"
              color="#000000"
              onPress={() => navigation.navigate("Search")}
            />
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              title="검색"
              color="#000000"
              onPress={() => navigation.navigate("Search")}
            />
          ),
        }}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              title="홈"
              color="#000000"
              onPress={() => navigation.navigate("소미 마켓")}
            />
          ),
        }}
        name="Search"
        component={Search}
      />
    </Stack.Navigator>
  );
};
