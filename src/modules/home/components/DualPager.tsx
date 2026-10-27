import styled from "@emotion/native";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  type ScrollViewInstance,
  View,
} from "react-native";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { WindowSafeAreaInsetsContext } from "#shared/hooks/useWindowSafeAreaInsets";

const VISIBLE_PAGES = 2;

/**
 * Pager for wide windows (e.g. an open iPhone Duo) showing two pages side by
 * side and snapping one page per swipe. A position is the index of the
 * leftmost visible page.
 */
export const DualPager = ({
  pages,
  position,
  onPositionChange,
}: {
  pages: ReactNode[];
  position: number;
  onPositionChange: (position: number) => void;
}) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollViewInstance>(null);
  const scrolledPosition = useRef(position);
  const [pageWidth, setPageWidth] = useState(0);

  // Follow positions requested from outside, e.g. the tab bar
  useEffect(() => {
    if (pageWidth === 0 || position === scrolledPosition.current) return;
    scrolledPosition.current = position;
    scrollViewRef.current?.scrollTo({ x: position * pageWidth });
  }, [position, pageWidth]);

  const onMomentumScrollEnd = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextPosition = Math.round(nativeEvent.contentOffset.x / pageWidth);
    if (nextPosition === scrolledPosition.current) return;
    scrolledPosition.current = nextPosition;
    onPositionChange(nextPosition);
  };

  return (
    <Container
      onLayout={({ nativeEvent }) => {
        setPageWidth(nativeEvent.layout.width / VISIBLE_PAGES);
      }}
    >
      {pageWidth > 0 && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          snapToInterval={pageWidth}
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: scrolledPosition.current * pageWidth, y: 0 }}
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {/* The container already clears the side insets, so pages must not
              add them again; surfaces over the whole window still get them */}
          <WindowSafeAreaInsetsContext.Provider value={insets}>
            <SafeAreaInsetsContext.Provider
              value={{ ...insets, left: 0, right: 0 }}
            >
              {pages.map((page, index) => (
                <View key={index} style={{ width: pageWidth }}>
                  {page}
                </View>
              ))}
            </SafeAreaInsetsContext.Provider>
          </WindowSafeAreaInsetsContext.Provider>
        </ScrollView>
      )}
    </Container>
  );
};

const Container = styled.View(() => {
  const { left, right } = useSafeAreaInsets();

  return { flex: 1, marginLeft: left, marginRight: right };
});
