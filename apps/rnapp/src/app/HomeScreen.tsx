import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="웹뷰 홈"
        onPress={() => navigation.navigate('WebViewScreen')}
      />
    </View>
  );
};

export default HomeScreen;
