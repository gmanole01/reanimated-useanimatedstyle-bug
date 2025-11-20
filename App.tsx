/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function repeat(item, count, mapper) {
  return Array.from({ length: count }, () => item)
    .map(mapper);
}

const items = repeat({
  id: 0,
  title: 'Hey'
}, 200, (item, index) => {
  return {
    ...item,
    id: index,
  };
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }, []);
  const keyExtractor = useCallback((item) => item.id, []);

  const init = useSharedValue(false);

  useEffect(() => {
    setTimeout(() => {
      init.set(true);
    }, 3000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    if (!init.get()) {
      return {};
    }

    return {
      height: withTiming(300)
    };
  });

  return (
    <View style={backgroundStyle} collapsable={false} collapsableChildren={false}>
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0 }} collapsable={false}>
        <Animated.View style={animatedStyle} collapsable={false} onLayout={e => {
          console.log('layout', e.nativeEvent.layout);
        }}>
          <View style={{ flex: 1 }} collapsable={false} onLayout={e => {
            console.log('inner content', e.nativeEvent.layout);
          }}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={keyExtractor} />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default App;
