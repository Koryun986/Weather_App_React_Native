import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import type {City} from '../../types/api-types';

interface SearchCityOptionProps {
  city: City;
  onPress: () => void;
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

const SearchCityOption: FC<SearchCityOptionProps> = ({city, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.container]}>
      <Text style={styles.city}>{city.name}</Text>
      <Text>{city.country}</Text>
    </Pressable>
  );
};

export default SearchCityOption;
