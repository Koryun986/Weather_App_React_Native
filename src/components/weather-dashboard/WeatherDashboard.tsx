import {Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {FC, useCallback, useEffect, useState} from 'react';
import api from '../../api';
import type {Weather} from '../../types/api-types';

interface WeatherDashboardProps {
  position: string;
}

const WeatherDashboard: FC<WeatherDashboardProps> = ({position}) => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getForecast(position!);
      if (!data) {
        setIsLoading(false);
        setError('Something went wrong');
        return;
      }
      setWeatherData(data);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [position]);

  useEffect(() => {
    if (position) {
      getWeatherData();
    } else {
      setError("Your position isn't avaliable");
    }
  }, [getWeatherData, position]);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RefreshControl refreshing={isLoading} onRefresh={getWeatherData}>
        {!!weatherData && (
          <View style={styles.infoContainer}>
            <Text style={styles.cityName}>{weatherData?.location.name}</Text>
            <Image
              source={{uri: `https:${weatherData.current.condition.icon}`}}
              alt={weatherData.current.condition.text}
              style={styles.icon}
            />
            <View style={styles.temp}>
              <Text style={styles.tempText}>{weatherData.current.temp_c}</Text>
              <View>
                <Text style={styles.tempSup}>o</Text>
              </View>
              <Text style={styles.tempText}>C</Text>
            </View>
            <Text>{weatherData.current.condition.text}</Text>
          </View>
        )}
      </RefreshControl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  tempText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tempSup: {
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
  },
});

export default WeatherDashboard;
