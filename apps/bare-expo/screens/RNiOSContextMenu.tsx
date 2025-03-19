import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ContextMenuView } from 'react-native-ios-context-menu';

export function RNiOSContextMenu() {
    return (
        <View style={styles.outerContainer}>
            <ContextMenuView
                style={styles.container}
                menuConfig={{
                    menuTitle: 'BasicUsageExample01',
                    menuItems: [{
                        actionKey: 'key-01',
                        actionTitle: 'Action #1',
                    }, {
                        actionKey: 'key-02',
                        actionTitle: 'Action #2',
                    }, {
                        actionKey: 'key-03',
                        actionTitle: 'Action #3',
                    }],
                }}
            >
                <Text style={styles.text}>
                    Press And Hold To Show Context Menu
                </Text>
            </ContextMenuView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
    },
    outerContainer: {
        flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
    },
    text: {
        fontSize: 16,
    },
});