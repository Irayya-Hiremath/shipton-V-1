import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Upload, Check, X, Eye } from 'lucide-react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function DocumentUploadCard({ 
  document, 
  isUploaded, 
  imageUri, 
  onUpload, 
  onRemove, 
  delay = 0 
}) {
  const { theme } = useTheme();
  const [isUploading, setIsUploading] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleUpload = async () => {
    Alert.alert(
      `Upload ${document.name}`,
      'Choose upload method',
      [
        { 
          text: 'Camera', 
          onPress: async () => {
            try {
              setIsUploading(true);
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission Required', 'Camera permission is required to take photos');
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
                exif: false,
              });
              
              if (!result.canceled && result.assets && result.assets[0]) {
                onUpload(document.id, result.assets[0].uri);
              }
            } catch (error) {
              console.error('Camera error:', error);
              Alert.alert('Error', 'Failed to capture image. Please try again.');
            } finally {
              setIsUploading(false);
            }
          }
        },
        { 
          text: 'Gallery', 
          onPress: async () => {
            try {
              setIsUploading(true);
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission Required', 'Gallery permission is required to select photos');
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: false,
                exif: false,
              });
              
              if (!result.canceled && result.assets && result.assets[0]) {
                onUpload(document.id, result.assets[0].uri);
              }
            } catch (error) {
              console.error('Gallery error:', error);
              Alert.alert('Error', 'Failed to select image. Please try again.');
            } finally {
              setIsUploading(false);
            }
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => onRemove(document.id)
        },
      ]
    );
  };

  const handleView = () => {
    Alert.alert('View Document', `Viewing ${document.name}`);
  };

  const styles = createStyles(theme);

  return (
    <AnimatedTouchableOpacity
      entering={FadeInUp.delay(delay).duration(600)}
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Text style={styles.title}>{document.name}</Text>
      <Text style={styles.description}>{document.description}</Text>
      
      {isUploaded ? (
        <View style={styles.uploadedContainer}>
          <View style={styles.uploadedImageContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.uploadedImage}
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleRemove}
            >
              <X size={16} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.uploadedActions}>
            <TouchableOpacity style={styles.viewButton} onPress={handleView}>
              <Eye size={16} color={theme.colors.primary} />
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
            <View style={styles.checkmarkContainer}>
              <Check size={16} color={theme.colors.success} />
              <Text style={styles.checkmarkText}>Uploaded</Text>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUpload}
          disabled={isUploading}
        >
          <Upload size={16} color={theme.colors.primary} />
          <Text style={styles.uploadButtonText}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Text>
        </TouchableOpacity>
      )}
    </AnimatedTouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  uploadedContainer: {
    width: '100%',
  },
  uploadedImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    position: 'relative',
    marginBottom: 12,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.colors.error,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  checkmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.success,
    marginLeft: 4,
  },
});