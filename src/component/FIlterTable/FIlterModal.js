import React, { Component } from 'react';
import { ScrollView, Text, View, Modal, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Icon, Button } from 'react-native-elements';

export class FilterModal extends Component {
    state = {
        activeSection: null,
    }

    resolveFilter() {
        let listedValues = { 
        };
        const { rowData, headData } = this.props.data;
        const { 
            filterContainer, 
            sectionContainer, 
            sectionStyle, 
            sectionTextStyle, 
            iconContainer,
            valueContainer,
            valueStyle,
            listStyle
        } = styles;

        return (
            <View style={filterContainer}>

        {headData.map((head, i) => head !== 'elements' && (
                <View style={sectionContainer} key={i}>
                    <TouchableOpacity
                        onPress={() => this.setState(prevState => ({
                            activeSection: prevState.activeSection === i ? null : i 
                        }))}
                        key={i}
                    >
                        <View style={sectionStyle} key={i + 1}>
                            <Text
                                style={sectionTextStyle} 
                            >{_.startCase(head)}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={listStyle} key={i + 2}>
                        {
                            this.state.activeSection === i && rowData.map(
                                (tr) => tr.map((td, i3) => {
                                        if (i === i3 && td) {
                                            if (!_.includes(listedValues[i], td)) {
                                                listedValues[i] ? listedValues[i].push(td) : listedValues = Object.assign({ [i]: [td] }, listedValues);

                                            return (
                                            <TouchableOpacity
                                                onPress={() => this.resolveFilterExclude(i, td)}
                                                key={i3}
                                                underlayColor="#fff"
                                            >
                                            <View
                                                style={[
                                                    valueContainer,
                                                    i3 === 0 && { paddingTop: 10 },
                                                    i3 === rowData.length - 1 && { 
                                                        paddingBottom: 10, 
                                                        borderBottomColor: '#cecece',
                                                        borderBottomWidth: 1
                                                    }
                                                ]}  
                                                key={i3 + 1}
                                            >
                                                <View style={iconContainer} key={i3 + 2}>
                                                {
                                                    !_.includes(this.props.filter.category[i], td) &&
                                                        <Icon
                                                            name="check"
                                                            color="#5BC4E5"
                                                            size={12}
                                                        />
                                                }
                                                </View>
                                                <Text
                                                    style={valueStyle} 
                                                    key={i3 + 3}
                                                >{td}
                                                </Text>
                                            </View>
                                            </TouchableOpacity>
                                            );
                                        }
                                        }
                                        return <View />;
                                    })
                            )
                        }  
                        </View>             
                </View>
            ))}
            </View>
        );
    }

    resolveFilterExclude(categoryKey, valueKey) {
        let { category } = this.props.filter;
        _.includes(category[categoryKey], valueKey) ? 
        _.remove(category[categoryKey], (n) => n === valueKey) : 
        category[categoryKey] ? category[categoryKey].push(valueKey) : category = Object.assign({ [categoryKey]: [valueKey] }, category);

        this.props.onFilterChange({ category });
    }

    render() {
        const { modalContainer, containerStyle, buttonStyle } = styles;
        const { visible, onPressClose } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => {}}
            >
                <View style={modalContainer}>
                    <Button 
                        title="Close"
                        onPress={onPressClose}
                        containerViewStyle={buttonStyle}
                        backgroundColor="#32B2DB"
                    />
                    <View style={containerStyle}>
                        <ScrollView>
                            {this.resolveFilter()}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    modalContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.70)',
    },
    containerStyle: {
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    sectionStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#cecece'
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: '#C7C6C7',
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        jutifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 4
    },
    buttonStyle: {
        width: '100%',
        overflow: 'hidden',
        marginLeft: 0,
        marginRight: 0
    }
};
