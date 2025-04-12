import React, { createContext, useContext } from "react";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const ScrollContext = createContext<any>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const translateY = useSharedValue(0);
  const lastScrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
          const offsetY = event.contentOffset.y;
          if (offsetY === 0 || offsetY < lastScrollY.value) {
              translateY.value = withTiming(0, { duration: 300 });
          } else if (offsetY > lastScrollY.value) {
              translateY.value = withTiming(100, { duration: 300 });
          }
          lastScrollY.value = offsetY;
      },
  });

  return (
    <ScrollContext.Provider value={{ translateY, scrollHandler }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollAnimated = () => useContext(ScrollContext);
