import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Circle, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  illustration: React.ReactNode;
  heading: string;
  headingHighlight?: string;
  description: string;
  currentIndex: number;
  totalScreens: number;
  onNext: () => void;
  onSkip: () => void;
}

function OnboardingScreen({
  illustration,
  heading,
  headingHighlight,
  description,
  currentIndex,
  totalScreens,
  onNext,
  onSkip,
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>{illustration}</View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          {heading}
          {headingHighlight && <Text style={styles.headingHighlight}> {headingHighlight}</Text>}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {Array.from({ length: totalScreens }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex ? styles.progressDotActive : styles.progressDotInactive,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

// Illustration 1: Two phones with handshake
function Illustration1() {
  return (
    <Svg width={width * 0.8} height={height * 0.35} viewBox="0 0 300 200">
      {/* Left Phone */}
      <Rect x="30" y="40" width="80" height="140" rx="8" fill="#4CAF50" />
      <Rect x="35" y="50" width="70" height="120" rx="4" fill="#FFFFFF" />
      {/* Person on left phone */}
      <Circle cx="70" cy="90" r="12" fill="#2D2D2D" />
      <Rect x="60" y="102" width="20" height="25" rx="2" fill="#4CAF50" />
      {/* Hand from left */}
      <Path
        d="M 100 110 Q 120 105 130 110"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Right Phone */}
      <Rect x="190" y="40" width="80" height="140" rx="8" fill="#4CAF50" />
      <Rect x="195" y="50" width="70" height="120" rx="4" fill="#FFFFFF" />
      {/* Person on right phone */}
      <Circle cx="230" cy="90" r="12" fill="#8B4513" />
      <Rect x="220" y="102" width="20" height="25" rx="2" fill="#2D2D2D" />
      {/* Hand from right */}
      <Path
        d="M 200 110 Q 180 105 170 110"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Handshake area */}
      <Circle cx="150" cy="110" r="8" fill="#4CAF50" />
      
      {/* Cloud/Smoke shapes */}
      <Path
        d="M 50 160 Q 60 150 70 160 Q 80 170 70 180 Q 60 190 50 180 Q 40 170 50 160"
        fill="#E0E0E0"
        opacity="0.6"
      />
      <Path
        d="M 230 160 Q 240 150 250 160 Q 260 170 250 180 Q 240 190 230 180 Q 220 170 230 160"
        fill="#E0E0E0"
        opacity="0.6"
      />
      
      {/* Green leaves */}
      <Path
        d="M 100 170 Q 105 165 110 170 Q 105 175 100 170"
        fill="#4CAF50"
        opacity="0.7"
      />
      <Path
        d="M 200 170 Q 205 165 210 170 Q 205 175 200 170"
        fill="#4CAF50"
        opacity="0.7"
      />
      
      {/* Shadow */}
      <Rect x="30" y="185" width="240" height="5" rx="2" fill="#D0D0D0" opacity="0.5" />
    </Svg>
  );
}

// Illustration 2: Person on money stack
function Illustration2() {
  return (
    <Svg width={width * 0.8} height={height * 0.35} viewBox="0 0 300 200">
      {/* Money stack base */}
      <Rect x="100" y="120" width="100" height="60" rx="4" fill="#2D8659" />
      <Rect x="105" y="110" width="90" height="15" rx="2" fill="#4CAF50" />
      <Rect x="110" y="100" width="80" height="15" rx="2" fill="#66BB6A" />
      
      {/* Person */}
      <Circle cx="150" cy="80" r="15" fill="#8B4513" />
      <Rect x="140" y="95" width="20" height="30" rx="2" fill="#87CEEB" />
      <Rect x="140" y="125" width="20" height="25" rx="2" fill="#2D2D2D" />
      
      {/* Arms outstretched */}
      <Path
        d="M 120 110 Q 100 105 90 110"
        stroke="#87CEEB"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 180 110 Q 200 105 210 110"
        stroke="#87CEEB"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Falling money */}
      <Rect x="50" y="50" width="30" height="20" rx="2" fill="#4CAF50" opacity="0.7" />
      <Rect x="220" y="60" width="30" height="20" rx="2" fill="#66BB6A" opacity="0.7" />
      <Rect x="80" y="40" width="25" height="18" rx="2" fill="#4CAF50" opacity="0.6" />
      <Rect x="200" y="45" width="25" height="18" rx="2" fill="#66BB6A" opacity="0.6" />
      <Rect x="40" y="70" width="20" height="15" rx="2" fill="#4CAF50" opacity="0.5" />
      <Rect x="240" y="75" width="20" height="15" rx="2" fill="#66BB6A" opacity="0.5" />
    </Svg>
  );
}

// Illustration 3: Piggy bank with person
function Illustration3() {
  return (
    <Svg width={width * 0.8} height={height * 0.35} viewBox="0 0 300 200">
      {/* Piggy Bank */}
      <Ellipse cx="120" cy="140" rx="50" ry="45" fill="#4CAF50" />
      <Ellipse cx="120" cy="140" rx="45" ry="40" fill="#66BB6A" />
      {/* Snout */}
      <Ellipse cx="100" cy="135" rx="8" ry="6" fill="#2D8659" />
      {/* Ears */}
      <Path d="M 80 110 L 90 100 L 85 115 Z" fill="#2D8659" />
      <Path d="M 90 100 L 100 95 L 95 110 Z" fill="#2D8659" />
      {/* Coin slot */}
      <Rect x="115" y="125" width="10" height="3" rx="1" fill="#2D8659" />
      
      {/* Person */}
      <Circle cx="200" cy="100" r="12" fill="#8B4513" />
      <Rect x="192" y="112" width="16" height="20" rx="2" fill="#2D2D2D" />
      <Rect x="192" y="132" width="16" height="25" rx="2" fill="#4CAF50" />
      
      {/* Stool */}
      <Rect x="188" y="157" width="24" height="8" rx="2" fill="#654321" />
      <Rect x="190" y="155" width="20" height="4" rx="1" fill="#8B4513" />
      
      {/* Coin */}
      <Circle cx="180" cy="120" r="15" fill="#4CAF50" />
      <Circle cx="180" cy="120" r="12" fill="#66BB6A" />
      <SvgText x="180" y="125" fontSize="16" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
        $
      </SvgText>
      
      {/* Background elements */}
      <Rect x="40" y="160" width="30" height="40" rx="2" fill="#E0E0E0" opacity="0.3" />
      <Path
        d="M 50 150 Q 55 145 60 150 Q 55 155 50 150"
        fill="#4CAF50"
        opacity="0.3"
      />
    </Svg>
  );
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      illustration: <Illustration1 />,
      heading: 'The No #1 cooperative society gone',
      headingHighlight: 'Digital.',
      description: 'We are committed to improving individual savings and investment habits.',
    },
    {
      illustration: <Illustration2 />,
      heading: 'Double your financial capacity',
      description:
        'We inject saving habits to the current system by creating easy and fair saving plans that would be favorable to our customers.',
    },
    {
      illustration: <Illustration3 />,
      heading: 'Start saving for a better tomorrow',
      description:
        'Use Cloud Cooperative to plan towards your dream home, kid\'s education and travel the world.',
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      handleSkip(); // Go to home screen after last screen
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <OnboardingScreen
      illustration={screens[currentScreen].illustration}
      heading={screens[currentScreen].heading}
      headingHighlight={screens[currentScreen].headingHighlight}
      description={screens[currentScreen].description}
      currentIndex={currentScreen}
      totalScreens={screens.length}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  skipText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4E71',
    textAlign: 'center',
    marginBottom: 15,
  },
  headingHighlight: {
    color: '#4CAF50',
    fontSize: 26,
  },
  description: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  progressDot: {
    borderRadius: 4,
  },
  progressDotActive: {
    width: 24,
    height: 8,
    backgroundColor: '#4CAF50',
  },
  progressDotInactive: {
    width: 8,
    height: 8,
    backgroundColor: '#E0E0E0',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

