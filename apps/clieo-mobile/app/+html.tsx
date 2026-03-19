import { ScrollView, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ padding: 20 }}>
          <h1>Not Found</h1>
          <p>This route is not available on the web.</p>
        </View>
      </ScrollView>
    </View>
  );
}
