/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigator from './Src/MainNavigator';
import App from './App';

AppRegistry.registerComponent(appName, () => MainNavigator);
