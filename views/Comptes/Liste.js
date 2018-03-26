/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {View, Text, ListView, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ListItem from '../../components/listItem1';
import Header from '../../components/Header';
import SubMenuContact from '../../components/subMenuContact';
import {Router} from '../../main';
import {fetchComptesPage} from '../../actions/comptes';
import MenuButtonComptes from '../../components/MenuButtonComptes';
import {Divider} from 'react-native-material-ui';
import {findAccount} from "../../actions/comptes";

class ComptesScreen extends React.Component {
    state = {
        dataSource: null,
        start: this.props.data.length,
        data: [],
        selectedRow: null,
        search:''
    };

    componentWillMount() {
        this._refreshData(this.state.data);
        this._fetch();
    }

    _searchAccount = async (value) => {
        const {dispatch} = this.props;
        await dispatch(findAccount(value, 0, 100));
        await this.setState({data:this.props.data, search:value, start:0});
        this._refreshData(this.state.data);
    };

    _refreshData = (data) => {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        if (data !== undefined) {
            this.setState({
                dataSource: ds.cloneWithRows(data),
                data: data
            });
        }
    };

    _navigateToCompte = (compte) => {
        this.props.navigator.push(Router.getRoute('detailCompte', {compte: compte}));
    };

    _fetch = async () => {
        const {dispatch} = this.props;
        if(this.state.search === '' || this.state.search === undefined) {
            await dispatch(fetchComptesPage(this.state.start, this.props.listLength));
        } else {
            await dispatch(findAccount(this.state.search, this.state.start, this.props.listLength));
        }
        this._increment();
        if (this.props.data !== undefined && this.props.data.length > 0) {
            if (this.state.data.length === 0) {
                let data = this.state.data.concat(this.props.data);
                this._refreshData(data);
            } else {
                if (this.state.data[this.state.data.length - 1][this.props.idField] !== this.props.data[9][this.props.idField]) {
                    let data = this.state.data.concat(this.props.data);
                    this._refreshData(data);
                }
            }
        }
    };

    __onSearchClosed = async () => {
        await this.setState({start:0, search:'', data:[]});
        this._refreshData(this.state.data);
        await this._fetch();
    };


    _increment = () => {
        this.setState(prevState => ({start: prevState.start + this.props.listLength}));
    };

    _updateIndex = async (rowID, rowData) => {
        let dataClone = this.state.data;
        let selectedRow = rowID;
        if (this.state.selectedRow === null) {
            rowData.isSelect = true;
        } else {
            if (this.state.selectedRow === rowID) {
                rowData.isSelect = false;
                selectedRow = null;
            } else {
                rowData.isSelect = true;
                dataClone[this.state.selectedRow].isSelect = false;
            }
        }
        dataClone[rowID] = rowData;
        this._refreshData(dataClone);
        this.setState({
            selectedRow: selectedRow
        });
    };

    _renderSubRow = (data) => {
        let s = {};
        if (!data.isSelect) {
            s = {display: 'none'};
        }
        return (
            <View style={s}>
                <SubMenuContact phone={'+33628492664'} email={'jul.79000@gmail.com'}
                                toProfile={() => this._navigateToCompte(data)}/>
            </View>);
    };

    _renderRow = (data, sectionID, rowID) => {
        return (
            <TouchableOpacity onPress={() => this._updateIndex(rowID, data)}>
                <Divider/>
                <View style={styles.content}>
                <View>
                    <Text style={styles.primary} numberOfLines={1}>
                        {data.clt_nom}
                    </Text>
                </View>
                <View>
                    <Text style={styles.secondary} numberOfLines={1}>
                        {data.etatclt_nom}
                    </Text>
                    <Text style={styles.secondary} numberOfLines={1}>
                        {data.clt_cp + ' ' + data.clt_ville}
                    </Text>
                </View>
                </View>
                {this._renderSubRow(data)}
                <Divider/>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={{height: '100%'}}>
                <Header search={true}
                        title='Comptes'
                        navigation={this.props.navigation}
                        onChangeText={(value) => this._searchAccount(value)}
                        onSearchClosed={() => this.__onSearchClosed()}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    style={{height: '90%'}}
                    renderRow={this._renderRow}
                    onEndReached={() => this._fetch()}
                    enableEmptySections={true}
                />
                <MenuButtonComptes/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    primary: {
        color:'#1B435D',
        fontSize:16,
        paddingLeft: '3%',
    },
    secondary: {
        color:'#78BBE6',
        fontSize:12,
        paddingTop:'1%',
        paddingLeft: '3%'
    },
    content:{
        paddingTop:'5%',
        paddingBottom:'5%',
    },
});

const mapStateToProps = (state) => {
    const {comptes} = state;
    return {
        data: comptes.comptes
    }
};

export default connect(mapStateToProps)(ComptesScreen);