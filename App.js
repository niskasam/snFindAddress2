import React, {useState, useRef} from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, FlatList} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {

  const key = 'QH7C1sdCLwdhzG0XT0uefsRp72HMXkHf';

  const [region, setRegion] = useState({
    latitude: 60.451650744313014,
    longitude: 22.267172535195293,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  const [location, setLocation] = useState('');


  const getAddress = () => {
    
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&street=${location}`)
    .then(response => response.json())
    .then(mapquestData => {
      setRegion({
        ...region,
        latitude:mapquestData.results[0].locations[0].latLng.lat,
        longitude:mapquestData.results[0].locations[0].latLng.lng
      })
    }).catch(error => {Alert.alert('error', error)})
  }


  return (
    <View style={styles.container}>
       <MapView
       style={styles.map}
       region={region}
      >
        <Marker
          coordinate={{
            latitude:region.latitude,
            longitude:region.longitude
          }}
        />
      
        </MapView>

    <TextInput
      onChangeText={text => setLocation(text)}
      style={styles.input}
      title="Search"
      placeholder="Type address and press search"
      >
    </TextInput>

    <Button
    title="Search"
    onPress={getAddress}
    ></Button>
    </View>

   

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },

  input:{
    width: "100%",
    textAlign:'center',
  }

});
