import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
interface SlideProps {
  title: string;
  right?: boolean;
  picture: number;
}
const { width, height } = Dimensions.get("window");
export const SLIDER_HEIGHT = 0.61 * height;

export const BORDER_RADIUS = 75;
const Slide = ({ title, right, picture }: SlideProps) => {
  const transform = [
    {
      translateY: (SLIDER_HEIGHT - 100) / 2,
    },
    {
      translateX: right ? width / 2 - 50 : -width / 2 + 50,
    },
    {
      rotate: right ? "-90deg" : "90deg",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.underLay}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.title}> {title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: { width: width },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontFamily: "SFProText-Bold",
    color: "white",
    lineHeight: 80,
    textAlign: "center",
  },
  underLay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});
