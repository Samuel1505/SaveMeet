import { CloudIcon } from '@/components/cloud-icon';
import { SaveMateLogo } from '@/components/savemate-logo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const cloudAnim1 = React.useRef(new Animated.Value(0)).current;
  const cloudAnim2 = React.useRef(new Animated.Value(0)).current;
  const cloudAnim3 = React.useRef(new Animated.Value(0)).current;
  const cloudAnim4 = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate clouds floating
    const cloudAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const cloudAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    const cloudAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim3, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim3, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    );

    const cloudAnimation4 = Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnim4, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnim4, {
          toValue: 0,
          duration: 4500,
          useNativeDriver: true,
        }),
      ])
    );

    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      cloudAnimation1,
      cloudAnimation2,
      cloudAnimation3,
      cloudAnimation4,
    ]).start();

    return () => {
      cloudAnimation1.stop();
      cloudAnimation2.stop();
      cloudAnimation3.stop();
      cloudAnimation4.stop();
    };
  }, []);

  const cloud1TranslateY = cloudAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const cloud2TranslateY = cloudAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const cloud3TranslateY = cloudAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const cloud4TranslateY = cloudAnim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  return (
    <Animated.View style={styles.container}>
      <LinearGradient
        colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Cloud Icons */}
        <Animated.View
          style={[
            styles.cloud1,
            {
              transform: [{ translateY: cloud1TranslateY }],
            },
          ]}
        >
          <CloudIcon size={80} filled={true} color="#A5D6A7" />
        </Animated.View>

        <Animated.View
          style={[
            styles.cloud2,
            {
              transform: [{ translateY: cloud2TranslateY }],
            },
          ]}
        >
          <CloudIcon size={70} filled={true} color="#B2DFDB" />
        </Animated.View>

        <Animated.View
          style={[
            styles.cloud3,
            {
              transform: [{ translateY: cloud3TranslateY }],
            },
          ]}
        >
          <CloudIcon size={65} filled={false} color="#C8E6C9" />
        </Animated.View>

        <Animated.View
          style={[
            styles.cloud4,
            {
              transform: [{ translateY: cloud4TranslateY }],
            },
          ]}
        >
          <CloudIcon size={75} filled={false} color="#A5D6A7" />
        </Animated.View>

        {/* SaveMate Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <SaveMateLogo size={200} />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloud1: {
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  cloud2: {
    position: 'absolute',
    top: '15%',
    right: '10%',
  },
  cloud3: {
    position: 'absolute',
    top: '8%',
    right: '5%',
  },
  cloud4: {
    position: 'absolute',
    top: '25%',
    right: '15%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

