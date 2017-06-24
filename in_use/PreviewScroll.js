import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StyleSheet,
  FlatList
} from 'react-native';

import {Actions} from 'react-native-router-flux';

const screen = Dimensions.get('window');
const previewBlockHeight = 100;
const previewBlockWidth = screen.width*7/10;
const previewBlockSpacing = 10;
