import React from 'react';
import {Text, TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default class Button extends React.Component {

    render() {
        return (
          <View style={styles.container}>
          <TouchableOpacity onPress={this.props.onPress} style={[styles.button, {backgroundColor: this.props.backgroundColor}]}>
              <View style={styles.item}>
                {this.props.children}
                <Text style={[styles.title, {color: this.props.color}]}>{this.props.title}</Text>
              </View>
          </TouchableOpacity>
          </View>

        );
    }
};

Button.defaultProps = {
    title: 'Button',
    backgroundColor: '#FFF',
    color:'#2196F3',
};

const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      margin:40,
    },
    button: {
      borderRadius:100,
      width:150,
    },
    item:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding:15,
    },
    title:{
      marginLeft:5,
      fontSize:18,
    },

});
