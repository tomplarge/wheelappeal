/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow weak
 * @providesModule PanResponderExample
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
} = ReactNative;

const screen = Dimensions.get('window');

const previewBlockHeight = 100;
const previewBlockWidth = screen.width*7/10;
const previewBlockSpacing = 10;

var PanResponderExample = React.createClass({
  _panResponder: {},
  // _previousLeft: 0,
  // _previousTop: 0,
  _previewStyles: {},
  preview: (null : ?{ setNativeProps(props: Object): void }),

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previewStyles = {
      style: {
        width: previewBlockWidth,
        height: screen.height,
        marginHorizontal: previewBlockSpacing,
        backgroundColor: 'green',
        overflow: 'hidden',
        borderRadius: 3,
        borderColor: '#000',
        open: 0,
        top: screen.height - previewBlockHeight
      }
    };
  },

  componentDidMount: function() {
    this._updateNativeStyles();
  },

  render: function() {
    return (
      <View
        style={styles.container}
        {...this.props}>
        <View
          ref={(preview) => {
            this.preview = preview;
          }}
          style={styles.preview}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  },

  _highlight: function() {
    this._previewStyles.style.backgroundColor = 'blue';
    if (this._previewStyles.style.open == 1) {
      this._previewStyles.style.open = 0;
      this._previewStyles.style.top += 200;
    }
    else{
      this._previewStyles.style.open = 1;
      this._previewStyles.style.top -= 200;
    }
    this._updateNativeStyles();
  },

  _unHighlight: function() {
    this._previewStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  },

  _updateNativeStyles: function() {
    this.preview.setNativeProps(this._previewStyles);
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return false;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return false;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this._highlight();
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    // this._previewStyles.style.left = this._previousLeft + gestureState.dx;
    // this._previewStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._unHighlight();
    // this._previousLeft += gestureState.dx;
    // this._previousTop += gestureState.dy;
  },
});

var styles = StyleSheet.create({
  preview: {
    width: previewBlockWidth,
    height: screen.height,
    marginHorizontal: previewBlockSpacing,
    backgroundColor: 'green',
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
    //top: screen.height - previewBlockHeight
  },
  container: {
    flex: 1,
  },
});

module.exports = PanResponderExample;
