import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Linking,
} from 'react-native';

import { generateApp } from '../api/vcApi';
import ModeSelector from '../components/ModeSelector';

// Create button component
const CreateButton = ({ onPress, isLoading }: { onPress: () => void; isLoading: boolean }) => {
  return (
    <TouchableOpacity style={styles.createButtonContainer} onPress={onPress} disabled={isLoading}>
      <View style={[styles.createButton, isLoading && styles.createButtonDisabled]}>
        <Text style={styles.createButtonText}>{isLoading ? 'Generating...' : '+ Create'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const convertToExpoGoUrl = (url: string) => {
  return url.replace('https://', 'exp://');
};

export default function GenerateAppScreen() {
  const [selectedTab, setSelectedTab] = useState('Quick');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateApp = async () => {
    Keyboard.dismiss();
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await generateApp(message);
      await AsyncStorage.setItem('currentProjectId', response.projectId);
      console.log('app url', response.publicUrl);
      // await loadApp(response.publicUrl);
      const expoGoUrl = convertToExpoGoUrl(response.publicUrl);
      console.log('app expoGoUrl', expoGoUrl);
      Linking.openURL(expoGoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate app');
      console.error('Error generating app:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={styles.container}>
            <View style={styles.header}>
              <TextInput
                style={styles.headerText}
                multiline
                placeholder="What app would you like to create?"
                placeholderTextColor="#D1D1D6"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <View style={styles.bottomContainer}>
              <ModeSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />

              <CreateButton onPress={handleCreateApp} isLoading={isLoading} />

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    color: '#000',
    lineHeight: 44,
    fontWeight: '400',
  },
  placeholderText: {
    fontSize: 24,
    color: '#D1D1D6',
    lineHeight: 32,
    marginBottom: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
    marginTop: 'auto',
  },
  createButtonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  createButton: {
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9747FF',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  createButtonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
