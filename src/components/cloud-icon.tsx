import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CloudIconProps {
  size?: number;
  filled?: boolean;
  color?: string;
}

export function CloudIcon({ size = 60, filled = false, color = '#B2DFDB' }: CloudIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d="M25,50 Q20,40 25,35 Q30,25 40,25 Q45,15 55,15 Q65,15 70,25 Q80,25 85,35 Q90,40 85,50 Q90,60 85,65 Q80,75 70,75 Q65,85 55,85 Q45,85 40,75 Q30,75 25,65 Q20,60 25,50 Z"
          fill={filled ? color : 'none'}
          stroke={filled ? 'none' : color}
          strokeWidth={filled ? 0 : 2}
          opacity={filled ? 0.6 : 0.4}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

