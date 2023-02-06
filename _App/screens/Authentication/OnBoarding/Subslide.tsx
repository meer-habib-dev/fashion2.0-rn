import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Button } from "../../../components/common";

interface SubslideProps {
  description: string;
  subtitle: string;
  last?: boolean;
  onPress: () => void;
}

const Subslide = ({ subtitle, description, last, onPress }: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        {...{ onPress }}
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
      />
    </View>
  );
};

export default Subslide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
  subtitle: {
    fontFamily: "SFProText-Semibold",
    fontSize: 20,
    color: "#0C0D34",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 12,
  },
  description: {
    fontFamily: "SFProText-Semibold",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    color: "#0C0D34",
    marginBottom: 40,
  },
});
