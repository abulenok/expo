import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'


const PermissionsPage = () => {
    const { requestPermission } = useCameraPermission()

    requestPermission();
    return (
        <View style={styles.container}>
            <Text>
                Requested permissions
            </Text>
        </View>
    )
};

const NoCameraDeviceError = () => {
    return (
        <View style={styles.container}>
            <Text>
                No camera device
            </Text>
        </View>
    );
}


export function RNVisionCamera() {
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()

    if (!hasPermission) return <PermissionsPage />
    if (device == null) return <NoCameraDeviceError />
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
});