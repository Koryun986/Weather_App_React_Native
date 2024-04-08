import {API_KEY, API_URL} from '@env';
import type {City, Weather} from '../types/api-types';

class Api {
  async getForecast(location: string) {
    const url = `forecast.json?q=${location}&days=5&aqi=no&alerts=no`;
    const data = (await this.fetchData(url)) as Weather;
    return data;
  }

  async getSearchCities(city: string) {
    const url = `search.json?q=${city}`;
    const data = (await this.fetchData(url)) as City[];
    return data;
  }

  private async fetchData(url: string) {
    const fullUrl = `${API_URL}/${url}&key=${API_KEY}`;
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error();
  }
}

export default new Api();
