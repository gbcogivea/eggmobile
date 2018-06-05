/**
 * Copyright © 2014 Scuelo S.A.S. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Julien Luquet <jul.79000@gmail.com>
 */

import React from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {Toolbar, Button, Divider} from 'react-native-material-ui';
import {connect} from 'react-redux';
import {addComment, fetchCommentsOfCompte} from '../../actions/comptes';
import Jumbotron from '../../components/jumbotron/jumbotronCompte';
import * as Constantes from '../../constantes';
import { formatDate } from "../../utils/utils";

class CommentsScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            comment: this.props.comment
        };
    }

    componentWillMount() {
        const {dispatch, selectedCompte} = this.props;
        dispatch(fetchCommentsOfCompte(selectedCompte));
    }

    _addComment = () => {
        if (this.state.comment !== Constantes.add_comment_message && this.state.comment !== '') {
            const {dispatch, selectedCompte} = this.props;
            dispatch(addComment(selectedCompte, this.state.comment));
            this.setState({comment: Constantes.add_comment_message});
        }
    };

    _handlerChangeTextArea = (value) => {
        this.setState({comment: value});
    };

    _handlerFocus = () => {
        if (this.state.comment === Constantes.add_comment_message) {
            this.setState({comment: ''});
        }
    };

    _renderHtml(value) {
        return {__html: value};
    }

    render() {
        const {selectedCompte} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => {
                        this.props.navigator.pop();
                    }}
                    centerElement={'Notes'}
                />
                <Jumbotron primaryText={selectedCompte.clt_nom}
                           secoundaryText={selectedCompte.etatclt_nom}
                           thirdText={`${selectedCompte.clt_adr1} \n ${selectedCompte.clt_cp} ${selectedCompte.clt_ville}`}/>
               <Text style={styles.title2}>Ajouter une note</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                               multiline={true}
                               numberOfLines={4}
                               onChangeText={this._handlerChangeTextArea}
                               onFocus={this._handlerFocus}
                               value={this.state.comment}
                    />

                </View>
                <Button onPress={this._addComment} raised primary text="Ajouter"/>
                <Text style={styles.title}>Historiques Notes</Text>
                <ScrollView>

                    {this.props.comments.map((comment, index) => {
                        return (
                            <View key={index}>
                                <Divider/>
                                <Text style={styles.date}>{formatDate(new Date(comment.debut))} {comment.agt_pre + ' ' + comment.agt_nom}</Text>
                                <Text style={styles.event}>{comment.type_nom}</Text>
                                <Text style={styles.comment}>{comment.comm}</Text>
                                <Text/>
                            </View>)

                    })}

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        margin: 15,
        height: 70
    },
    input: {
        height: 65,
        color:'#1B435D',
        paddingLeft:'3%',
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:'#1B435D',
        fontSize:16,
        paddingLeft: '3%',
        paddingTop:20,
        paddingBottom:20,
        fontWeight:'bold',
    },
    title2:{
        color:'#1B435D',
        fontSize:16,
        paddingLeft: '3%',
        paddingTop:20,
        fontWeight:'bold',

    },
    date:{
        color:'#78BBE6',
        fontSize:12,
        paddingLeft: '2%',
        paddingTop:10,
    },
    name:{
        color:'#1B435D',
        fontSize:16,
        paddingLeft: '3%',
        paddingTop:5,
    },
    comment:{
        color:'#1B435D',
        fontSize:12,
        paddingLeft: '3%',
    },
    event:{
        color:'#1B435D',
        fontSize:12,
        paddingLeft: '3%',
        fontWeight:'bold',
    },
    container:{
        flex:1,
    }
});

const mapStateToProps = (state) => {
    const {comptes} = state;
    return {
        selectedCompte: comptes.selectedCompte,
        comments: comptes.notes,
        comment: Constantes.add_comment_message
    }
};

export default connect(mapStateToProps)(CommentsScreen);
