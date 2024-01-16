import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import ratio from '../libs/ratio';
import {Color} from '../style/gobalStyle';

const CountryScreen = ({navigation, route}) => {
  const {country} = route.params;

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={Color.slate} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/leftarrow.png')}
                style={styles.ArrowImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.countryItem}>
            <View>
              <Text style={styles.Emoji}>{country?.emoji}</Text>
            </View>
            <Text style={styles.countryName}>{country?.name}</Text>
          </View>
          <View>
            <View style={styles.ObjectContainer}>
              <View style={styles.PropContainer}>
                <View style={styles.Question}>
                  <Text>Native</Text>
                </View>
                <View style={styles.Answer}>
                  <Text>{country?.native}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ObjectContainer}>
              <View style={styles.PropContainer}>
                <View style={styles.Question}>
                  <Text>Capital</Text>
                </View>
                <View style={styles.Answer}>
                  <Text>{country?.capital}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ObjectContainer}>
              <View style={styles.PropContainer}>
                <View style={styles.Question}>
                  <Text>Currency</Text>
                </View>
                <View style={styles.Answer}>
                  <Text>{country?.currency}</Text>
                </View>
              </View>
            </View>
            <View style={styles.ObjectContainer}>
              <View style={styles.PropContainer}>
                <View style={styles.Question}>
                  <Text>Languages</Text>
                </View>
                <View style={styles.Answer}>
                  {country?.languages.map((lang, index) => (
                    <View key={index} style={styles.LanguageContainer}>
                      <Text style={styles.LanguageText}>{lang.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
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
  Emoji: {
    width: ratio.widthPixel(20),
    height: ratio.heightPixel(20),
  },
  countryName: {
    fontSize: ratio.fontPixel(30),
    color: Color.white,
    textAlign: 'center',
  },
  ArrowImage: {
    width: ratio.widthPixel(40),
    backgroundColor: Color.white,
    borderRadius: 99999999999999999,
    height: ratio.heightPixel(40),
    marginLeft: ratio.widthPixel(20),
    marginVertical: ratio.heightPixel(20),
  },
  ObjectContainer: {
    marginVertical: ratio.heightPixel(20),
    width: ratio.widthPixel(380),
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  PropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Question: {
    borderRadius: ratio.widthPixel(20),
    borderColor: Color.white,
    backgroundColor: Color.gary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ratio.widthPixel(20),
    paddingVertical: ratio.heightPixel(10),
    borderWidth: ratio.widthPixel(1),
  },
  Answer: {
    borderRadius: ratio.widthPixel(20),
    borderColor: Color.lightGary,
    backgroundColor: Color.gary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ratio.widthPixel(20),
    paddingVertical: ratio.heightPixel(10),
    borderWidth: ratio.widthPixel(1),
  },
  LanguageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ratio.heightPixel(5),
  },
  FlagImage: {
    width: ratio.widthPixel(20),
    height: ratio.heightPixel(20),
    marginRight: ratio.widthPixel(10),
  },
  LanguageText: {
    fontSize: ratio.fontPixel(16),
    color: Color.white,
  },
});

export default CountryScreen;
