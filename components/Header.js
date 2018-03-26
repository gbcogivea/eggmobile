/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { search } = this.props;
        return (
            <View>
                {!search &&
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => {
                        this.props.navigation.getNavigatorByUID('MainDrawer').toggleDrawer()
                    }}
                    centerElement={this.props.title}
                    />
                }{search &&
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={() => {
                        this.props.navigation.getNavigatorByUID('MainDrawer').toggleDrawer()
                    }}
                    centerElement={this.props.title}
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Rechercher',
                        onChangeText:this.props.onChangeText,
                        onSearchClosed:this.props.onSearchClosed
                    }}
                    />
                }
            </View>
        );
    }
}

export default Header;