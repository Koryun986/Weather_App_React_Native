import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useDebounce from '../hooks/useDebounce';
import SearchCityOptionsLayout from '../components/search-city/SearchCityOptionsLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
    <View style={styles.container}>
      {isSearchBarOpen && (
        <SearchCityOptionsLayout cityName={debouncedSearchCityValue} />
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
