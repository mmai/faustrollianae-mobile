import React from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Easing, Animated } from 'react-native';

import { Font } from 'expo';

import { Card, Icon } from 'react-native-elements';

import {randomQuoteId, randomQuote} from './patamancy';

export default class App extends React.Component {
  state = {
    spinValue: new Animated.Value(0),
    fontLoaded: false,
    showIntroduction: true,
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

  animateSpin = (endCallback) => {
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
    ]).start(endCallback)
  }

  updateQuote = () => {
    this.setState({showCard: false, showIntroduction: false})
    this.animateSpin(() => {
        this.setState({showCard: true})
      })
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
          <Icon iconStyle={styles.button} reverse raised type="material-community" name="dice-3" size={42} color="gray" />
        </Animated.View>
      </TouchableWithoutFeedback>
      </View>
      {
        this.state.fontLoaded ? (
          this.state.showIntroduction ?  (<Introduction />) : 
          this.state.showCard  ? ( <QuoteCard quote={this.state.quote} />) : null
        ) : null
      }
      </ScrollView>
      </View>
    );
  }
}

class Introduction extends React.Component {
  render(){
    return (
        <View style={styles.introduction}>
          <Text style={styles.introductionText}></Text>
          <Text style={styles.introductionText}>"Tout est dans Faustroll"</Text>
          <Text style={styles.introductionText}>Boris Vian</Text>
          <Text style={styles.introductionText}></Text>
        </View>
        )
  }
}

class QuoteCard extends React.Component {
    render() {
      return (
      <Card style={styles.card}>
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontFamily: 'lora-regular', fontSize: 18 }}> {this.props.quote.quote}</Text>
        </View>
        <View style={{ paddingRight: 20, paddingLeft: 20, backgroundColor: '#fff' }}>
          <Text style={styles.cardInfos}>Alfred Jarry</Text>
          <Text style={styles.cardInfos}>{this.props.quote.chapter.join('\n')}</Text>
          <Text style={styles.cardInfos}>[ {this.props.quote.position/1000}% ]</Text>
        </View>
      </Card>
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
  button: {
    elevation: 5,
  },
  introduction: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introductionText: {
    fontSize: 16, 
  },
  card: {
    elevation: 5,
    backgroundColor: '#fff',
    margin: 10,
    paddingBottom: 10,
  },
  cardInfos: {
    fontFamily: 'lora-italic',
    fontSize: 13, 
  }
});

//Not used
class Quote extends React.Component {
    render() {
    return  (
      <Animated.View style={{transform: [{rotate: this.props.spin}]}} >
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontFamily: 'lora-regular', fontSize: 18 }}> {this.props.quote.quote}</Text>
        </View>
        <View style={{ paddingRight: 20, paddingLeft: 20, backgroundColor: '#fff' }}>
          <Text style={{ fontFamily: 'lora-regular', fontSize: 13 }}>Alfred Jarry</Text>
          <Text style={{ fontFamily: 'lora-italic', fontSize: 13 }}>{this.props.quote.chapter.join('\n')}</Text>
          <Text style={{ fontSize: 13 }}>-- {this.props.quote.position/1000}% --</Text>
        </View>
      </Animated.View>
    )
   }
 }

