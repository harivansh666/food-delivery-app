import { StyleSheet, Text, View } from "react-native";
import React from "react";

const menu = () => {
  return (
    <View style={styles.container}>
      <Text>menu </Text>
    </View>
  );
};

export default menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
