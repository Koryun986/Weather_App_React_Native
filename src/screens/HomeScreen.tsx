import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useDebounce from '../hooks/useDebounce';
import SearchCityOptionsLayout from '../components/search-city/SearchCityOptionsLayout';
import Geolocation from '@react-native-community/geolocation';
import {COLOR_PRIMARY} from '../utils/styles/color-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
  },
});

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>['navigation'];
}) => {
  const [searchCityValue, setSearchCityValue] = useState('');
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [error, setError] = useState<string>(null);
  const [position, setPosition] = useState<string>(null);
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

  useEffect(() => {
    return () => {
      Geolocation.getCurrentPosition(
        position => {
          setPosition(
            `${position.coords.latitude},${position.coords.longitude}`,
          );
        },
        e => {
          setError(e.message);
        },
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      {isSearchBarOpen && (
        <SearchCityOptionsLayout cityName={debouncedSearchCityValue} />
      )}
      {!error ? <Text>{position}</Text> : <Text>{error}</Text>}
    </View>
  );
};

export default HomeScreen;
