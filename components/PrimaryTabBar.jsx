import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

const ICON_MAP = {
  Home: 'home-variant',
  Saved: 'bookmark-outline',
  Browse: 'grid-large',
  Profile: 'account-circle-outline',
};

export default function PrimaryTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const activeColor = theme?.activeColor || '#7c3aed';
  const textMuted = '#94a3b8';

  const handleFabPress = () => {
    Alert.alert('Quick Apply', 'This shortcut will let you apply faster very soon.');
  };

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }] }>
      <View style={styles.shadowLayer}>
        <View style={styles.bar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const IconName = ICON_MAP[route.name] || 'circle-outline';

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons
                  name={IconName}
                  size={24}
                  color={isFocused ? activeColor : textMuted}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? '#111827' : textMuted, fontWeight: isFocused ? '700' : '500' },
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: activeColor,
            shadowColor: activeColor,
            bottom: Math.max(insets.bottom, 12) + 36,
          },
        ]}
        activeOpacity={0.9}
        onPress={handleFabPress}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  shadowLayer: {
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 15,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderColor: 'rgba(255,255,255,0.4)',
  },
});
