import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line } from 'react-native-svg';

interface SaveMateLogoProps {
  size?: number;
}

export function SaveMateLogo({ size = 120 }: SaveMateLogoProps) {
  const iconSize = size * 0.6;
  const textSize = size * 0.25;
  // Calculate position for "sm" text (center of front stack: x=42.5%, y=45% in viewBox)
  const smTextLeft = iconSize * 0.425 - 12;
  const smTextTop = iconSize * 0.45 - 8;

  return (
    <View style={styles.container}>
      {/* Logo Icon - Money Stacks */}
      <View style={[styles.iconContainer, { width: iconSize, height: iconSize }]}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
          {/* Left stack - darker green */}
          <Rect
            x="10"
            y="20"
            width="25"
            height="60"
            rx="3"
            fill="#2D8659"
            opacity={0.9}
          />
          {/* Middle stack - medium green */}
          <Rect
            x="20"
            y="15"
            width="25"
            height="65"
            rx="3"
            fill="#4CAF50"
            opacity={0.9}
          />
          {/* Right stack - vibrant green with "sm" */}
          <Rect
            x="30"
            y="10"
            width="25"
            height="70"
            rx="3"
            fill="#4CAF50"
          />
          {/* Speed lines extending to the right */}
          <Line x1="55" y1="25" x2="70" y2="20" stroke="#4CAF50" strokeWidth="2" />
          <Line x1="55" y1="35" x2="75" y2="30" stroke="#4CAF50" strokeWidth="2" />
          <Line x1="55" y1="45" x2="70" y2="40" stroke="#4CAF50" strokeWidth="2" />
          <Line x1="55" y1="55" x2="75" y2="50" stroke="#4CAF50" strokeWidth="2" />
        </Svg>
        {/* "sm" text overlaid on front stack */}
        <View style={[styles.smTextContainer, { left: smTextLeft, top: smTextTop }]}>
          <Text style={styles.smText}>sm</Text>
        </View>
      </View>
      
      {/* SaveMate Text */}
      <Text style={[styles.logoText, { fontSize: textSize }]}>SaveMate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  smTextContainer: {
    position: 'absolute',
    width: 24,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  logoText: {
    fontWeight: 'bold',
    color: '#4CAF50',
    letterSpacing: 0.5,
  },
});

