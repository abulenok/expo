import React, { useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated 
} from "react-native";

interface ModeSelectorProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedTab, onSelectTab }) => {
  const slideAnim = useRef(new Animated.Value(selectedTab === "Quick" ? 0 : 1)).current;
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: selectedTab === "Quick" ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [selectedTab, slideAnim]);

  // Calculate the translation based on the animation value
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 100] // Adjust these values based on your segmentButton width
  });

  return (
    <View style={styles.segmentedControl}>
      {/* Animated slider that moves based on selected tab */}
      <Animated.View 
        style={[
          styles.slider, 
          { transform: [{ translateX }] }
        ]} 
      />
      
      <TouchableOpacity
        style={styles.segmentButton}
        onPress={() => onSelectTab("Quick")}
      >
        <Text
          style={[
            styles.segmentButtonText,
            selectedTab === "Quick" && styles.segmentButtonTextActive,
          ]}
        >
          Quick
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.segmentButton}
        onPress={() => onSelectTab("Guided")}
      >
        <Text
          style={[
            styles.segmentButtonText,
            selectedTab === "Guided" && styles.segmentButtonTextActive,
          ]}
        >
          Guided
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    width: 200,
    position: "relative",
  },
  slider: {
    position: "absolute",
    width: "48%", // Slightly less than half to account for padding
    height: "92%", // Increased from 85% to better fill the control
    backgroundColor: "#fff",
    borderRadius: 21,
    top: 3, // Adjusted from 4 to better center vertically
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 0,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 21,
    zIndex: 1,
  },
  segmentButtonText: {
    color: "#999",
    fontSize: 16,
  },
  segmentButtonTextActive: {
    color: "#000",
    fontWeight: "500",
  },
});

export default ModeSelector; 