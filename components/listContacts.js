import React from 'react';
import { View } from 'react-native';
import ListItem from './listItem1';
import SubMenuContact from './subMenuContact';
import { Router } from '../main';

export default class Contacts extends React.Component {

    _navigateToProfile = (contact) => {
        this.props.navigator.push(Router.getRoute('profile', {profil:contact}));
    };

    render() {
        return (<View>{this.props.contacts.map((contact, index)=> {
            const subElement = <SubMenuContact phone={contact.cct_tel}
                                               email={contact.cct_mail}
                                               toProfile={() => this._navigateToProfile(contact)}/>;
            return <ListItem
                key={index}
                externalComponent={subElement}
                centerElement={{primaryText:contact.cct_nom + ' ' +
                    contact.cct_pre, secondaryText:contact.fonction_nom}}/>
        })}</View>);
    }
}

