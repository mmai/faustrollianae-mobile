import React from 'react';

import { Font } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Easing, Animated } from 'react-native';
import {randomQuoteId, randomQuote} from './patamancy';

export default class App extends React.Component {
  state = {
    spinValue: new Animated.Value(0),
    fontLoaded: false,
    quote:randomQuote()
  }

  async componentDidMount() {
    await Font.loadAsync({
        'lora-regular': require('./assets/fonts/Lora-Regular.ttf'),
        'lora-italic': require('./assets/fonts/Lora-Italic.ttf'),
        'lora-bolditalic': require('./assets/fonts/Lora-BoldItalic.ttf'),
        'lora-bold': require('./assets/fonts/Lora-Bold.ttf'),
      });
    this.setState({ fontLoaded: true });

  }

  animateSpin = () => {
    Animated.sequence([
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 400,
          easing: Easing.linear
        }
      ), 
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 0,
          duration: 1,
          easing: Easing.linear
        }
      ) 
      ]).start()
  }

  updateQuote = () => {
    this.animateSpin()
    this.setState({quote:randomQuote()}) ;
  }


  render() {
    let spin = this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })

    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
      <TouchableWithoutFeedback onPress={this.updateQuote}>
      <Animated.View style={{transform: [{rotate: spin}]}} >
          <MaterialCommunityIcons name="dice-3" size={52} color="gray" />
          <Text style={{ fontSize: 14 }}> {this.state.quote.position/1000}%</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      </View>
      {
        this.state.fontLoaded? (
        <Quote quote={this.state.quote} spin={spin} />
        ) : null
      }
      </ScrollView>
      </View>
    );
  }
}

class Quote extends React.Component {
    render() {
    return  (
      <Animated.View style={{transform: [{rotate: this.props.spin}]}} >
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontFamily: 'lora-regular', fontSize: 18 }}> {this.props.quote.quote}</Text>
        </View>
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Text style={{ fontFamily: 'lora-regular', fontSize: 13 }}>Alfred Jarry</Text>
          <Text style={{ fontFamily: 'lora-italic', fontSize: 13 }}>{this.props.quote.chapter.join('\n')}</Text>
        </View>
      </Animated.View>
    )
   }
 }


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
