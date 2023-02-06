import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import Slide, { SLIDER_HEIGHT, BORDER_RADIUS } from "./Slide";
import Animated, {
  divide,
  multiply,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";
import Subslide from "./Subslide";
import Dot from "./Dot";
// import {useShare}
interface OnBoardingProps {}

const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: require("../../../../assets/1.jpg"),
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardobe? Explore hudres of outfit idea ",
    color: "#BEECC4",
    picture: require("../../../../assets/2.jpg"),
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amzaing everyday",
    color: "#FFE4D9",
    picture: require("../../../../assets/3.jpg"),
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description: "the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: require("../../../../assets/4.jpg"),
  },
];
const OnBoarding = () => {
  // const styles = useStyles();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    )
  );
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
  const currentIndex = useDerivedValue(() => x.value / width);
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {slides.map(({ title, picture }, index) => {
            // const style = useAnimatedStyle(() => ({
            //   opacity: interpolate(
            //     x.value,
            //     [(index - 0.5) * width, index * width, (index + 0.5) * width],
            //     [0, 1, 0],
            //     Extrapolate.CLAMP
            //   ),
            // }));
            return (
              <Slide
                key={index}
                {...{ title, picture }}
                right={!!(index % 2)}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, background]} />
        <View style={[styles.footerContent]}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                width: width * slides.length,
              },
              footerStyle,
            ]}
          >
            {/* <View style={styles.pagination}>
              {slides.map((_, index) => (
                <Dot
                  currentIndex={currentIndex}
                  key={index}
                  {...{ index, x }}
                />
              ))}
            </View> */}
            {slides.map(({ subtitle, description }, index) => (
              <Subslide
                key={index}
                {...{ subtitle, description }}
                last={index === slides.length - 1}
                onPress={() => {
                  scroll.current?.scrollTo({
                    x: width * (index + 1),
                    animated: true,
                  });
                }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
    // paddingHorizontal: 30,
  },
  footer: {
    flex: 1,
  },

  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
