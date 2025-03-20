import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

import { updateApp } from '../api/vcApi';

interface AppUpdaterProps {
  onSuccess?: () => void;
}

const UpdateAppComponent: React.FC<AppUpdaterProps> = ({ onSuccess }) => {
  const [updateMessage, setUpdateMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAppUpdate = async () => {
    if (!updateMessage.trim()) {
      Alert.alert('Error', 'Please enter an update prompt');
      return;
    }

    setIsUpdating(true);
    try {
      const projectId = await AsyncStorage.getItem('currentProjectId');
      if (!projectId) {
        throw new Error('No project ID found. Please create a new app first.');
      }

      const response = await updateApp(updateMessage, projectId);
      console.log('App updated:', response);

      Alert.alert('Update Successful', 'Your app has been updated. Refresh to see the changes.');
      setUpdateMessage('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update app');
      console.error('Error updating app:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What would you like to change"
        value={updateMessage}
        onChangeText={setUpdateMessage}
        multiline
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleAppUpdate}
        disabled={isUpdating}
        style={[styles.updateButton, isUpdating && styles.updateButtonDisabled]}>
        <Text style={styles.updateButtonText}>{isUpdating ? 'Updating...' : 'Update App'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
  },
  updateButton: {
    backgroundColor: '#58CC02',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UpdateAppComponent;
