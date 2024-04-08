import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface SearchCityOptionsLayoutProps {
  cityName: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

const SearchCityOptionsLayout: FC<SearchCityOptionsLayoutProps> = ({
  cityName,
}) => {
  return (
    <View style={styles.container}>
      <Text>{cityName}</Text>
    </View>
  );
};

export default SearchCityOptionsLayout;
