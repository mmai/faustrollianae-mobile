import React from 'react';

import { StyleSheet, Dimensions, Text, View, ScrollView, Easing, Animated, Image } from 'react-native';

import { Font } from 'expo';

import { Card, Icon, Button } from 'react-native-elements';

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
          duration: 700,
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
    // this.setState({showCard: false, showIntroduction: false})
    this.setState({ showIntroduction: false, showCard: false})
    this.animateSpin(() => {
        this.setState({showCard: true})
      })
    this.setState({quote:randomQuote()}) ;
  }


  render() {
    let spin = this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
      })
    let opacityVal = this.state.spinValue.interpolate({
        inputRange: [0, 0.4, 0.8, 1],
        outputRange: [0, 1, 1, 0]
      })

    return (
      <View style={styles.container}>
      <ScrollView>

      {
        this.state.fontLoaded ? (
          this.state.showIntroduction ?  (<Introduction />) : 
          this.state.showCard  ? ( <QuoteCard quote={this.state.quote}/>) : null
        ) : null
      }

            {
                   ( this.state.showCard || this.state.showIntroduction)? (
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                      <Button title="Explorer le clinamen" raised size={42} onPress={this.updateQuote} />
                      {/*<Icon iconStyle={styles.button} raised type="material-community" name="dice-3" size={42} color="gray"  onPress={this.updateQuote} /> */}
                  </View>) :null
                  }
      </ScrollView>

      {
        this.state.showCard ? null : (
          <Animated.View style={[styles.overlay, {top: 130, opacity: 0.8, transform: [{rotate: spin}]}]} >
            <View style={{padding:20}}>
              <Animated.Image style={{ width:300, height:300, opacity:opacityVal}} source={require('./assets/black-spiral-lollipop-600.png')} />
            </View>
          </Animated.View>
        )
      }



      </View>
    );
  }
}

class Introduction extends React.Component {
  render(){
    return (
        <View style={styles.introduction}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ width: '90%', fontSize: 26, fontFamily: 'lora-regular'}}>« Tout est dans Faustroll »</Text>
          </View>
          <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 20, fontFamily: 'lora-italic'}}>Boris Vian</Text>
          </View>
        </View>
        )
  }
}

class QuoteCard extends React.Component {
    render() {
      return (
        <Animated.View>
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
        </Animated.View>
    )
   }
 }

var { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Flex to fill, position absolute, 
  // Fixed left/top, and the width set to the window width
  overlay: {
    flex: 1,
    position: 'absolute',
    width: width,
    left: 0,
    top: 0,
  },  
  button: {
    elevation: 5,
  },
  introduction: {
    height: 400,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

