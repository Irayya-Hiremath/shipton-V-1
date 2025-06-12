import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Upload, Check, CircleAlert as AlertCircle, FileText, Camera, User } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const documents = [
  {
    id: 'aadhaar',
    title: 'Owner Aadhaar Card',
    icon: FileText,
    status: 'pending', // pending, uploaded, verified, rejected
    description: 'Upload clear photo of your Aadhaar card',
  },
  {
    id: 'pan',
    title: 'Owner PAN Card',
    icon: FileText,
    status: 'uploaded',
    description: 'Upload clear photo of your PAN card',
  },
  {
    id: 'selfie',
    title: 'Owner Selfie',
    icon: User,
    status: 'verified',
    description: 'Take a clear selfie for verification',
  },
  {
    id: 'license',
    title: 'Driving License',
    icon: FileText,
    status: 'pending',
    description: 'Upload both sides of your driving license',
  },
  {
    id: 'rc',
    title: 'Vehicle RC',
    icon: FileText,
    status: 'pending',
    description: 'Upload vehicle registration certificate',
  },
  {
    id: 'insurance',
    title: 'Vehicle Insurance',
    icon: FileText,
    status: 'pending',
    description: 'Upload current vehicle insurance document',
  },
];

export default function DocumentsTab() {
  const { theme } = useTheme();
  const [uploadProgress, setUploadProgress] = useState({});

  const styles = createStyles(theme);

  const handleUpload = (documentId) => {
    Alert.alert(
      'Upload Document',
      'Choose upload method',
      [
        { text: 'Camera', onPress: () => simulateUpload(documentId, 'camera') },
        { text: 'Gallery', onPress: () => simulateUpload(documentId, 'gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateUpload = (documentId, method) => {
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[documentId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [documentId]: 100 };
        }
        return { ...prev, [documentId]: currentProgress + 10 };
      });
    }, 200);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return theme.colors.success;
      case 'uploaded':
        return theme.colors.warning;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return Check;
      case 'uploaded':
        return AlertCircle;
      case 'rejected':
        return AlertCircle;
      default:
        return Upload;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'uploaded':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Upload Required';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
          <Text style={styles.title}>Document Upload</Text>
          <Text style={styles.subtitle}>
            Upload the following documents to complete your registration
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>3 of 6 documents completed</Text>
        </Animated.View>

        <View style={styles.documentsContainer}>
          {documents.map((document, index) => {
            const StatusIcon = getStatusIcon(document.status);
            const DocumentIcon = document.icon;
            const isUploading = uploadProgress[document.id] !== undefined && uploadProgress[document.id] < 100;
            
            return (
              <Animated.View
                key={document.id}
                entering={FadeInUp.delay(600 + index * 100).duration(600)}
                style={styles.documentCard}
              >
                <View style={styles.documentHeader}>
                  <View style={styles.documentIconContainer}>
                    <DocumentIcon size={24} color={theme.colors.primary} />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>{document.title}</Text>
                    <Text style={styles.documentDescription}>{document.description}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <StatusIcon size={20} color={getStatusColor(document.status)} />
                  </View>
                </View>

                <View style={styles.documentFooter}>
                  <Text style={[styles.statusText, { color: getStatusColor(document.status) }]}>
                    {getStatusText(document.status)}
                  </Text>
                  
                  {document.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => handleUpload(document.id)}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Text style={styles.uploadButtonText}>
                          Uploading... {uploadProgress[document.id]}%
                        </Text>
                      ) : (
                        <>
                          <Upload size={16} color={theme.colors.primary} />
                          <Text style={styles.uploadButtonText}>Upload</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}

                  {document.status === 'verified' && (
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  )}

                  {document.status === 'uploaded' && (
                    <TouchableOpacity style={styles.retryButton}>
                      <Text style={styles.retryButtonText}>Replace</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {isUploading && (
                  <View style={styles.uploadProgressContainer}>
                    <View style={styles.uploadProgressBar}>
                      <View style={[styles.uploadProgressFill, { width: `${uploadProgress[document.id]}%` }]} />
                    </View>
                  </View>
                )}
              </Animated.View>
            );
          })}
        </View>

        <Animated.View entering={FadeInUp.delay(1200).duration(600)} style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            Make sure all documents are clear and readable. Contact support if you face any issues.
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  documentsContainer: {
    marginBottom: 24,
  },
  documentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
  },
  statusContainer: {
    padding: 8,
  },
  documentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  viewButton: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
  retryButton: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
  uploadProgressContainer: {
    marginTop: 12,
  },
  uploadProgressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
  },
  uploadProgressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  helpContainer: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
});