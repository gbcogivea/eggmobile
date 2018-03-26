import Exponent, { Asset, AppLoading } from 'expo';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import DrawerNavigationExample from './components/DrawerNavigationExample';
import LoginView from './views/login';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import Agenda from './views/agenda';
import Affaire from './views/affaire';
import Container from './container';
import DetailAffaire from './views/detailAffaire';
import Compte from './views/Comptes/Liste';
import Contact from './views/contact';
import Document from './views/document';
import Geo from './views/geo';
import Profile from './views/profile';
import DetailCompte from './views/Comptes/Details';
import Suivi from './views/Comptes/Suivi';
import Communications from './views/Comptes/Communication';
import ContactsDuCompte from './views/Comptes/Contacts';
import CommentDuCompte from './views/Comptes/Comments';
import InfoComplementaires from './views/Comptes/InfosComplementaires';
import SlidingTabNavigationExample from './components/SlidingTabNavigationExample';
import AlertBarsExample from './components/AlertBarsExample';
import TranslucentBarExample from './components/TranslucentBarExample';
import EventEmitterExample from './components/EventEmitterExample';
import CustomNavigationBarExample from './components/CustomNavigationBarExample';
import Logout from './views/Logout';
import Welcome from './views/Welcome';
import ContactsAffaire from './views/affaire/Contacts';
import Chiffrage from './views/affaire/chiffrage';
import DocumentsAffaire from './views/affaire/documents';
import Products from './views/affaire/products';
import EventAffaire from './views/affaire/events';
import EstimateAffaire from './views/affaire/devis';
import InvoiceAffaire from './views/affaire/factures';
import CompteContactAffaire from './views/affaire/compteContact';
import WebViewDocs from './views/document/webviewDoc';

/**
 * Forms
 */
import CreateAffaire from './components/forms/Affaire';
import CreateCompte from './components/forms/Compte';
import CreateContact from './components/forms/Contact';
import CreateEvenement from './components/forms/Evenement';
import CreateTache from './components/forms/Tache';

import { connect, Provider } from 'react-redux';
import configureStore from './store/configure-store';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Root } from 'native-base';
import moment from 'moment';
import 'moment/locale/fr';

const store = configureStore;

import { createRouter, NavigationProvider } from '@expo/ex-navigation';

const assets = [
  require('./assets/beetle.jpg'),
  require('./assets/cat.gif'),
  require('./assets/colorful-windows.jpg'),
  require('./assets/paintbrush.jpg'),
  require('./assets/space.jpg'),
  require('./assets/sparkles.jpg'),
];

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20
    }
  }
};

moment.locale('fr');

/**
 * This is where we map route names to route components. Any React
 * component can be a route, it only needs to have a static `route`
 * property defined on it, as in HomeScreen below
 */
export const Router = createRouter(() => ({
  logout: () => Logout,
  home: () => Welcome,
  agenda: () => HomeScreen,
  createAffaire: () => CreateAffaire,
  createCompte: () => CreateCompte,
  createContact: () => CreateContact,
  createEvenement: () => CreateEvenement,
  createTache: () => CreateTache,
  about: () => AboutScreen,
  agenda: () => Agenda,
  affaire: () => Affaire,
  compte: () => Compte,
  contact: () => Contact,
  document: () => Document,
  geo: () => Geo,
  detailCompte: () => DetailCompte,
  documentsAffaire: () => DocumentsAffaire,
  eventsAffaire: () => EventAffaire,
  products: () => Products,
  detailAffaire: () => DetailAffaire,
  chiffrage: () => Chiffrage,
  contactsAffaire: () => ContactsAffaire,
  estimatesAffaire: () => EstimateAffaire,
  invoicesAffaire: () => InvoiceAffaire,
  communication: () => Communications,
  contactsDuCompte: () => ContactsDuCompte,
  commentsDuCompte: () => CommentDuCompte,
  profile: () => Profile,
  suivi: () => Suivi,
  infoComplementaires: () => InfoComplementaires,
  slidingTabNavigationExample: () => SlidingTabNavigationExample,
  alertBarsExample: () => AlertBarsExample,
  translucentBarExample: () => TranslucentBarExample,
  eventEmitterExample: () => EventEmitterExample,
  customNavigationBarExample: () => CustomNavigationBarExample,
  compteEtContact : () => CompteContactAffaire,
  detailDoc: () => WebViewDocs
}));

class App extends Component {
  state = {
    bootstrapped: false,
    fontsAreLoaded: false
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('./assets/fonts/roboto/Roboto-Light.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    const promises = assets.map(module =>
      Asset.fromModule(module).downloadAsync()
    );
    await Promise.all(promises);
    this.setState({bootstrapped: true, fontsAreLoaded: true});
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    if (!this.state.bootstrapped && !this.state.fontsAreLoaded) {
      return <AppLoading/>;
    } else {
      return (
        <Root>
          <Provider store={store}>
            <ThemeProvider uiTheme={uiTheme}>
              <NavigationProvider router={Router}>
                <Container>
                  <LoginView/>
                </Container>
              </NavigationProvider>
            </ThemeProvider>
          </Provider>
        </Root>
      );
    }
  }
}

Exponent.registerRootComponent(App);
