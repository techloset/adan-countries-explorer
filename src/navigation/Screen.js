import CountryScreen from '../screens/CountryScreen';
import HomeScreen from '../screens/HomeScreen';

export const ScreenNames = {
  HOME: 'home',
  COUNTRY: 'Country',
};
export const StackScreens = [
  {
    name: ScreenNames.HOME,
    component: HomeScreen,
  },
  {
    name: ScreenNames.COUNTRY,
    component: CountryScreen,
  },
];
