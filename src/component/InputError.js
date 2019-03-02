import React, { Component } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FAILURE_COLOR } from '../constant';

export class InputError extends Component {
  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible !== this.props.visible && visible === true) {
      this.animate.fadeIn();
    } else if (visible !== this.props.visible && visible === false) {
      this.animate.fadeOut();
    }
  }
  render() {
    const { errorText, containerStyle } = this.props;

    return (
      <Animatable.View
        ref={ref => (this.animate = ref)}
        style={[styles.containerStyle, containerStyle]}
      >
        <Text style={styles.textStyle}>{errorText}</Text>
      </Animatable.View>
    );
  }
}

const styles = {
  containerStyle: {
    alignSelf: 'center',
    marginBottom: 20,
    width: '90%',
  },
  textStyle: {
    color: FAILURE_COLOR,
    textAlign: 'center',
  },
};
