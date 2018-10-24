import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native'
import Moment from 'react-moment';
import 'moment-timezone';
import TextButton from './TextButton'
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { white, blue, my_blue, my_green } from '../utils/colors'
import { getLocationsSuccess, getLocationsFailure } from '../actions/userposts'


class Location extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Location',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Home"
          color= {white}
        />
      )
    }
  }
  state = {
    gardenSelected: false,
    selectedGarden: {},
    gardensSelected: true,
    plantsSelected: false,
    plantsList0: [],
    plantsList1: [],
    plantsList2: [],
  };

  componentDidMount() {
    const { location } = this.props.navigation.state.params

    length = location.plants.length
    if (length % 2 == 0) {
      half = length / 2
      scndstart = half + 1
    } else {
      half = (length + 1) / 2
      scndstart = half + 1
    }
    list1 = location.plants.slice(0, half)
    list2 = location.plants.slice(scndstart, length)
    this.setState({
      plantsList1: list1,
      plantsList2: list2,
    })
    console.log(this.state)
  }

  toMap = () => {
    this.props.navigation.navigate('Map');
  }
  toHome = () => {
    this.props.navigation.navigate('Home');
  }

  selectGarden = (garden) => {
    this.setState({
      gardenSelected: true,
      selectedGarden: garden,
    })
  }

  showGardens = (e) => {
    this.setState({
      gardensSelected: true,
      plantsSelected: false,
      gardenSelected: false,
      selectedGarden: {},
    })
    console.log(this.state)
    e.preventDefault();
  }

  showPlants = (e) => {
    this.setState({
      gardensSelected: false,
      plantsSelected: true,
      gardenSelected: false,
      selectedGarden: {},
    })
    e.preventDefault();
  }


  render() {
    const { gardensSelected, gardenSelected, selectedGarden, plantsSelected, plantsList1, plantsList2 } = this.state
    const { location } = this.props.navigation.state.params
    console.log("Location--->", location);
    // console.log("Plant List 1--->", plantsList1);
    // console.log("Plant List 2--->", plantsList2);

    return (
      <ScrollView>
        <View style = {styles.imageContainer}>
          <Text style = {{fontSize: 18, color: 'blue'}}> This is where the image of the location will go</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.locationAddressContainer}>
            <Text style = {{fontSize: 18, color: 'white'}}>{location.address}</Text>
          </View>
          <View style={styles.gardenPlantTabContainer}>
            <TouchableOpacity
             style={styles.gardenPlantTab}
             onPress={this.showGardens}
            >
              <Text style = {{fontSize: 18, color: 'white'}}>Gardens</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.gardenPlantTab}
             onPress={this.showPlants}
            >
              <Text style = {{fontSize: 18, color: 'white'}}>Plants</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gardenPlantListContainer}>
            <ScrollView style={styles.gardenPlantScrollView}>
            {plantsSelected
            ? plantsList1.map((plant, index) => {
                return (
                  <View key={index} style={styles.gardenPlantTextBox}>
                    <Text key={index} style={styles.text}>{plant.name}</Text>
                  </View>
                )
              })
            :
              location.gardens.map((garden, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.gardenPlantTextBox}
                    onPress={ e => this.selectGarden(garden)}
                  >
                      <Text key={index} style={styles.text}>{garden.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
            </ScrollView>
            <ScrollView style={styles.gardenPlantScrollView}>
              {plantsSelected
              ? plantsList2.map((plant, index) => {
                  return (
                    <View key={index} style={styles.gardenPlantTextBox}>
                      <Text key={index} style={styles.text}>{plant.name}</Text>
                    </View>
                  )
                })
              : (gardenSelected
                ? selectedGarden.plants.map((plant, index) => {
                    return (
                      <View key={index} style={styles.gardenPlantTextBox}>
                        <Text key={index} style={styles.text}>{plant.name}</Text>
                      </View>
                    )
                  })
                :
                  location.plants.map((plant, index) => {
                    console.log(plant.name)
                    return (
                      <View key={index} style={styles.gardenPlantTextBox}>
                        <Text key={index} style={styles.text}>{plant.name}</Text>
                      </View>
                    )
                  })
                )
              }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      token: state.auth.token,
    };
}


export default connect(mapStateToProps)(Location);

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      padding: 5,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   imageContainer: {
      height: 215,
      backgroundColor: '#7c53c3',
   },
   contentContainer: {
      flex: 1,
      height: 435,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#2d882d',
      justifyContent: 'space-evenly',
   },
   locationAddressContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 0,
      marginTop: 0,
      backgroundColor: '#2d882d',
   },
   gardenPlantTabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 2,
      marginTop: 0,
   },
   gardenPlantListContainer: {
      flex: 8,
      flexDirection: 'row',
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   gardenPlantTab: {
      alignItems: 'center',
      width: '50%',
      justifyContent: 'center',
      backgroundColor: '#2d882d',
      borderRadius: 4,
      borderColor: '#fff',
      borderLeftWidth: 1.5,
      borderTopWidth: 1.5,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
   },
   gardenPlantScrollView: {
      flex: 1,
      padding: 0,
      marginTop: 0,
      backgroundColor: '#f0f4f0',
   },
   gardenPlantTextBox: {
      alignItems: 'center',
      padding: 5,
      margin: 2,
      backgroundColor: '#f0f4f0',
   },
   text: {
      fontSize: 12,
      color: '#42260A'
   }
})