import React, {useState, useRef} from 'react';
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
  Modal,
  Image,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ratio from '../libs/ratio';
import {Color} from '../style/gobalStyle';
import {ScreenNames} from '../navigation/Screen';

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const HomeScreen = ({navigation}) => {
  const [searchCountry, setSearchCountry] = useState('');
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const {loading, data} = useQuery(LIST_COUNTRIES);
  const countries = data?.countries || [];

  const languages = Array.from(
    new Set(
      countries.flatMap(country => country.languages.map(lang => lang.name)),
    ),
  );

  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase()) &&
      (!selectedLanguage ||
        country.languages.some(lang => lang.name === selectedLanguage)),
  );

  const toggleLanguageModal = () => {
    setLanguageModalVisible(!isLanguageModalVisible);
  };

  const flatListRef = useRef();

  const handleLanguageSelect = language => {
    setSelectedLanguage(language);
    toggleLanguageModal();

    const selectedIndex = languages.indexOf(language);
    flatListRef.current.scrollToIndex({index: selectedIndex, animated: true});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() =>
        navigation.navigate(`${ScreenNames.COUNTRY}`, {country: item})
      }>
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

        <TouchableOpacity
          onPress={toggleLanguageModal}
          style={styles.languageDropdown}>
          <Text style={styles.languageText}>
            {selectedLanguage ? selectedLanguage : 'Select a language'}
          </Text>
        </TouchableOpacity>

        {isLanguageModalVisible && (
          <View style={styles.languageDropdownContainer}>
            <ScrollView>
              <FlatList
                ref={flatListRef}
                data={languages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleLanguageSelect(item)}>
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        )}

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
    fontSize: ratio.fontPixel(17),
    color: Color.white,
  },
  Emoji: {
    width: ratio.widthPixel(20),
    height: ratio.heightPixel(20),
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
  languageDropdown: {
    marginTop: ratio.heightPixel(16),
    padding: ratio.widthPixel(15),
    borderWidth: ratio.widthPixel(1),
    backgroundColor: Color.gary,
    borderRadius: ratio.widthPixel(8),
    color: Color.white,
    width: ratio.widthPixel(380),
    height: ratio.heightPixel(70),
    alignSelf: 'center',
    marginHorizontal: 'auto',
    justifyContent: 'center',
  },
  languageText: {
    color: Color.white,
    fontSize: ratio.fontPixel(16),
  },
  languageDropdownContainer: {
    maxHeight: ratio.heightPixel(400),
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomRightRadius: ratio.widthPixel(8),
    borderBottomLeftRadius: ratio.widthPixel(8),
    width: ratio.widthPixel(380),
    alignSelf: 'center',
    marginHorizontal: 'auto',
    justifyContent: 'center',
  },
  option: {
    paddingVertical: ratio.heightPixel(10),
    paddingHorizontal: ratio.widthPixel(20),
    borderBottomWidth: ratio.heightPixel(0.6),
    borderBottomColor: Color.white,
  },
  optionText: {
    fontSize: ratio.fontPixel(16),
    color: Color.white,
  },
  Countries: {
    flexDirection: 'column',
    gap: 12,
    marginTop: ratio.heightPixel(30),
  },
});

export default HomeScreen;
