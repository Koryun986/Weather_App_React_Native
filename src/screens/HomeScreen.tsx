import {
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useDebounce from '../hooks/useDebounce';
import {SearchBar} from 'react-native-screens';
import SearchCityOptionsLayout from '../components/SearchCityOptionsLayout';

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>['navigation'];
}) => {
  const [searchCityValue, setSearchCityValue] = useState('');
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const debouncedSearchCityValue = useDebounce(searchCityValue);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search city...',
        onChangeText: e => setSearchCityValue(e.nativeEvent.text),
        onOpen: () => setIsSearchBarOpen(true),
        onClose: () => setIsSearchBarOpen(false),
      },
    });
  }, [navigation]);

  return (
    <View>
      {isSearchBarOpen && (
        <SearchCityOptionsLayout cityName={debouncedSearchCityValue} />
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
