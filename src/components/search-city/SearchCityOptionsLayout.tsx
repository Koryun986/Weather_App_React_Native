import {FC, useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Text,
} from 'react-native';
import api from '../../api/index';
import SearchCityOption from './SearchCityOption';
import type {City} from '../../types/api-types';
import {
  COLOR_PRIMARY,
  TRANSPARENT_COLOR_PRIMARY,
} from '../../utils/styles/color-constants';

interface SearchCityOptionsLayoutProps {
  cityName: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: '100%',
    backgroundColor: COLOR_PRIMARY,
  },
});

const SearchCityOptionsLayout: FC<SearchCityOptionsLayoutProps> = ({
  cityName,
}) => {
  const [searchOptions, setSearchOptions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const getSearchOptions = useCallback(async () => {
    if (!cityName) {
      return;
    }
    try {
      setIsLoading(true);
      const cities = await api.getSearchCities(cityName);
      setIsLoading(false);
      if (cities) {
        setSearchOptions(cities);
      } else {
        throw new Error();
      }
    } catch (e) {
      setError('Something went wrong');
    }
  }, [cityName, setError]);

  useEffect(() => {
    getSearchOptions();
  }, [getSearchOptions]);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Oops something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {!!cityName.trim() && !!searchOptions.length && (
            <ScrollView>
              {searchOptions.map(searchOption => (
                <SearchCityOption city={searchOption} key={searchOption.id} />
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default SearchCityOptionsLayout;
