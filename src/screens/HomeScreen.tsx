import {
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useDebounce from '../hooks/useDebounce';

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>['navigation'];
}) => {
  const [searchCityValue, setSearchCityValue] = useState('');
  const debouncedSearchCityValue = useDebounce(searchCityValue);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search city...',
        onChangeText: e => setSearchCityValue(e.nativeEvent.text),
      },
    });
  }, [navigation]);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
