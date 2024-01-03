import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useState} from 'react';

import ratio from '../libs/ratio';
import {Color} from '../style/gobalStyle';
import {gql, useQuery} from '@apollo/client';

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      native
      capital
      emoji
      currency
    }
  }
`;

const HomeScreen = ({navigation}) => {
  const [searchCountry, setSearchCountry] = useState('');

  const {loading, data} = useQuery(LIST_COUNTRIES);
  const countries = data?.countries || [];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => navigation.navigate('Country', {country: item})}>
      <Text style={styles.countryName}>{item.name}</Text>
      <View>
        <Text style={styles.Emoji}>{item?.emoji}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Color.slate} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <SafeAreaView>
          <TextInput
            placeholder="Enter a country"
            style={styles.input}
            placeholderTextColor={Color.white}
            value={searchCountry}
            onChangeText={text => setSearchCountry(text)}
          />
        </SafeAreaView>
        {loading ? (
          <View style={styles.Loader} />
        ) : (
          <FlatList
            data={filteredCountries}
            keyExtractor={item => item.name}
            initialNumToRender={10}
            renderItem={renderItem}
            style={styles.Countries}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: Color.slate,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    width: 20,
    height: 80,
  },
  Countries: {
    flexDirection: 'column',
    gap: 12,
  },
  Loader: {
    width: ratio.widthPixel(20),
    height: ratio.heightPixel(20),
    borderRadius: 999999999999,
    borderColor: Color.white,
    backgroundColor: Color.slate,
    borderWidth: ratio.widthPixel(2),
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  countryItem: {
    width: ratio.widthPixel(380),
    height: ratio.heightPixel(70),
    borderRadius: ratio.widthPixel(20),
    borderColor: Color.white,
    backgroundColor: Color.gary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 'auto',
    marginBottom: ratio.heightPixel(15),
    borderWidth: ratio.widthPixel(1),
    flexDirection: 'row',
    gap: ratio.widthPixel(20),
  },
  countryName: {
    fontSize: ratio.fontPixel(20),
    color: Color.white,
  },
  input: {
    marginTop: ratio.heightPixel(16),
    padding: ratio.widthPixel(15),
    borderWidth: ratio.widthPixel(1),
    backgroundColor: Color.gary,
    borderRadius: ratio.widthPixel(8),
    marginBottom: ratio.heightPixel(30),
    color: Color.white,
    width: ratio.widthPixel(380),
    height: ratio.heightPixel(70),
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  Emoji: {
    width: ratio.widthPixel(20),
    height: ratio.heightPixel(20),
  },
});

export default HomeScreen;
