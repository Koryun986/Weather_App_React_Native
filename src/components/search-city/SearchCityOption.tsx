import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {City} from '../../types/api-types';

interface SearchCityOptionProps {
  city: City;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  city: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const SearchCityOption: FC<SearchCityOptionProps> = ({city}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city.name}</Text>
      <Text>{city.country}</Text>
    </View>
  );
};

export default SearchCityOption;
