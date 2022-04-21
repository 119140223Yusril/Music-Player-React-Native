import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';

const DataLagu = [
  {id: '123a', lagu: 'OneOkRock',},
  {id: '123b', lagu: 'AvengedSevenFold'},
  {id: '123c', lagu: 'Maroon5'}
]

const Item = ({ lagu }) => (
  <View style={styles.item}>
    <Text>{lagu}</Text>
  </View>
);


const App = () => {
  const [sound, setSound] = React.useState();

  const renderItem = ({ item }) => (
    <Item lagu={item.lagu} />
  );

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/OneOkRockWeAre.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0288d1" barStyle="light-content"/>
      <View style={{ padding: 30, backgroundColor: '#03a9f4', elevation: 1}}>
            <Text style={{
              textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18
            }}
            >
              JokeBox
            </Text>
          </View>
      <FlatList
          data={DataLagu}
          renderItem={ ({item}) => 
            <View style={{ backgroundColor: 'lightblue', padding: 15}}>
              <Text style={styles.judulLagu}>{item.lagu}</Text>
              <Button title="Putar" onPress={playSound}/>
            </View>

          }
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  judulLagu: {
    fontSize: 20,
    textAlign: 'center',
  },
});


export default App;