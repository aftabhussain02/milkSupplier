import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { FilterModal } from './FIlterModal';
import { GroupByList } from './GroupByList';
import { GroupByButton } from './GroupByButton';

export class FilterTable extends Component {
    state = {
        groupBy: [],
        data: {
            headData: [],
            rowData: [
            ],
            groupData: {}
        },
        filter: {
            category: {}
        },
        sortBy: {
            key: null,
            type: 0
        },
    }
    componentWillReceiveProps(nextProp) {
        const headData = [];
        const rowData = [];
            _.map(nextProp.data.headData, (v, i) => {
                if (!_.includes(nextProp.hideCels, i)) {
                    headData.push(v);
                }
            });

            _.map(nextProp.data.rowData, val => {
                const arr = [];
                _.map(val, (v, i) => {
                    if (!_.includes(nextProp.hideCels, i)) {
                        arr.push(v);
                    }
                });
                rowData.push(arr);
            });

            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    headData,
                    rowData
                }
            }));
    }

    componentWillUpdate(__, nextState) {
        if (!_.isEqual(nextState.groupBy.sort(), this.state.groupBy.sort())) {
            this.resolveGroupByData(nextState.groupBy, nextState.filter);
        }
    }

    onChangeSortBy(i) {
        this.setState(prevState => ({
            sortBy: {
                key: i,
                type: !prevState.sortBy.type
            }
        }));
        
        const { data, sortBy } = this.state;

        const rowData = data.rowData.sort((a, b) => i === 0 ? parseInt(a[i]) > parseInt(b[i]) ? sortBy.type ? 1 : -1 : sortBy.type ? -1 : 1 : a[i] > b[i] ? sortBy.type ? 1 : -1 : sortBy.type ? -1 : 1);

        this.setState(prevState => ({
            data: {
                ...prevState.data,
                rowData
            }
        }));

        this.resolveGroupByData(this.state.groupBy, this.state.filter);
    }

    resolveGroupByData(groupBy, nextFilter) {
       const rowData = [];
       this.state.data.rowData.map(
            (tr, i) => {
                let filter = false;
                _.map(nextFilter.category, (v, key) => {
                if (_.includes(v, tr[key])) {
                        filter = true;
                    }
                });

                if (!filter) {
                    rowData.push(tr);  
                }
                return tr; 
            });

        const groups = _.groupBy(rowData, (v) => _.map(groupBy, (v2) => v[v2]));
        const data = _.map(groups, (group) => {
                let obj = {};
                _.map(groupBy, (v) => {
                        obj = { ...obj, [v]: group[0][v] };
                });
                obj = { ...obj, items: group };
                return obj;
            });
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                groupData: data
            }
        }));
    }
    
    resolveTable() {
        const { headData, rowData, groupData } = this.state.data;
        const { onViewPress, idKey, onEditPress, data } = this.props;
        const { 
            tableContainer, 
            colContainer,
            headContainer,
            headStyle,
            tdContainer,
            tdStyle,
            sortByIconStyle,
            elementContainer,
            element,
            elementDif
         } = styles;

        if (this.state.groupBy && this.state.groupBy.length > 0) {
            return (
                <View style={[tableContainer, { flexDirection: 'column' }]}>
                <View style={{ flexDirection: 'row' }}>
                {
                    _.map(this.state.groupBy, (i6) => (
                        <View
                        style={[{ 
                            width: 40, 
                            minHeight: 40, 
                            borderLeftWidth: 1, 
                            borderBottomWidth: 1
                        }, i6 === 0 && {
                            borderLeftWidth: 0
                        }]}
                        />
                        ))
                }
                {
                    headData.map((head, i) => (

                    <TouchableWithoutFeedback 
                        onPress={() => this.onChangeSortBy(i)}
                        onLongPress={() => this.setState(prevState => ({
                            groupBy: !_.includes(prevState.groupBy, i) ? [...prevState.groupBy, i] : prevState.groupBy
                        }))}
                    >
                        
                    <View
                    style={[{       
                        padding: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        color: '#333',
                        minWidth: 200,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }]}
                    >
                    <Text style={headStyle}>{_.startCase(head)}</Text>
                        {
                            this.state.sortBy.key === i && 
                            <Icon
                                name={!this.state.sortBy.type ? 'arrow-drop-up' : 'arrow-drop-down'}
                                containerStyle={sortByIconStyle}
                            />
                        }
                    </View>
                        </TouchableWithoutFeedback>
                    ))
                }
                </View>
                {
                        _.map(groupData, (group, i1) => {
                                let count = -1;
                                return (
                                    <View key={i1} style={{ flexDirection: 'column', flex: 1 }}>
                                    {
                                        
                                        _.map(group, (v, i) => {    
                                                count++;
                                                if (i !== 'items') {
                                                    return (
                                                        <View key={i} style={{ minHeight: 40, flexDirection: 'row' }}>
                                                            <View style={{ width: 40 * count, }} />
                                                            <View
                                                                style={[{ 
                                                                    paddingLeft: 20, 
                                                                    borderColor: '#333',
                                                                    borderLeftWidth: 1,
                                                                    borderBottomWidth: 1,
                                                                    borderTopWidth: 1,
                                                                    width: '100%', 
                                                                    justifyContent: 'center' 
                                                                }, i == 0 && { 
                                                                    borderLeftWidth: 0, 
                                                                 }]}
                                                            >
                                                                <Text style={{ justifyContent: 'center' }}>{headData[i]}: {v} - {group.items.length} Item</Text>
                                                            </View>
                                                        </View>
                                                    );    
                                                } 
                                                 return v.map((v2, i5) => (
                                                        <View
                                                            key={i5} 
                                                            style={[{ 
                                                            flexDirection: 'column', 
                                                         }]}
                                                        >
                                                        <View style={{ flexDirection: 'row', marginLeft: 80 * i }}>
                                                            {
                                                                _.map(this.state.groupBy, () => (
                                                                    <View style={{ width: 40, minHeight: 40 }} />
                                                                    ))
                                                            }
                                                            {
                                                            v2.map((v3, key) => {
                                                                if (key == 5) {
                                                                return (
                                                                    <View
                                                                        style={[elementContainer, { 
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            alignSelf: 'center',
                                                                            minWidth: 200,
                                                                            borderLeftWidth: 1,
                                                                            borderBottomWidth: 1,                                                                                
                                                                            padding: 10,
                                                                        }]}
                                                                    >
                                                                    <Text style={element} onPress={() => onViewPress(v3)}>View</Text>
                                                                    <Text style={elementDif}>|</Text>
                                                                    <Text style={element} onPress={() => onEditPress(v3)}>Edit</Text>
                                                                    </View>
                                                                );
                                                            }
                                                            
                                                            return (
                                                                <View
                                                                key={key}
                                                                    style={{ 
                                                                        padding: 10,
                                                                        borderLeftWidth: 1,
                                                                        color: '#333',
                                                                        minWidth: 200,
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderBottomWidth: 1,
                                                                    }}
                                                                >
                                                                    <Text>{v3}</Text>
                                                                </View>
                                                            );
                                                            })
                                                            }
                                                        </View>
                                                        </View>
                                                        )
                                                 );   
                                            }
                                        )
                                    }
                                    </View>
                                );
                        })
                    
                }
             </View>   
            );
        } 
            return (
                <View style={tableContainer}>

            {headData.map((head, i) => (
                    <View style={colContainer} key={i}>
                    <TouchableWithoutFeedback 
                        onPress={() => this.onChangeSortBy(i)}
                        onLongPress={() => this.setState(prevState => ({
                            groupBy: !_.includes(prevState.groupBy, i) ? [...prevState.groupBy, i] : prevState.groupBy
                        }))}
                    >
                        <View style={[headContainer, i === 0 && { borderLeftWidth: 0 }]}>
                            <Text style={headStyle}>{_.startCase(head)}</Text>
                            {
                                this.state.sortBy.key === i && 
                                <Icon
                                    name={!this.state.sortBy.type ? 'arrow-drop-up' : 'arrow-drop-down'}
                                    containerStyle={sortByIconStyle}
                                />
                            }
                        </View>
                    </TouchableWithoutFeedback>
                            {
                                rowData.map(
                                    (tr, i2) => {
                                        let filter = false;
                                    _.map(this.state.filter.category, (v, key) => {
                                        if (_.includes(v, tr[key])) {
                                                filter = true;
                                            } 
                                        });
                                        if (!filter) {
                                            if (head === 'elements') {
                                               return (
                                                   <View style={[tdContainer, i === 0 && { borderLeftWidth: 0 }]} key={i2}>{
                                                    tr.map((td, i3) => {
                                                        if (i === i3) {
                                                            return (
                                                                <View style={elementContainer}>
                                                                <Text style={element} onPress={() => onViewPress(td)}>View</Text>
                                                                <Text style={elementDif}>|</Text>
                                                                <Text style={element} onPress={() => onEditPress(td)}>Edit</Text>
                                                                </View>
                                                            );
                                                            }
                                                            return <View />;
                                                        })
                                                    }</View>
                                                );
                                            }
                                            return (
                                                <View style={[tdContainer, i === 0 && { borderLeftWidth: 0 }]} key={i2}>{
                                                    tr.map((td, i3) => {
                                                    if (i === i3) {
                                                        return (
                                                            <Text style={tdStyle}>{td}</Text>
                                                        );
                                                        }
                                                        return <View />;
                                                    })
                                                }</View>
                                            );
                                        }
                                    return <View />;
                                }
                                )
                            }               
                    </View>
                ))}
                </View>
            );
    }

    tableUpdate(filter) {
        this.resolveGroupByData(this.state.groupBy, filter);
        this.setState({
            filter 
        });
    }

    resolveGroupByList() {
        const { groupBy, data } = this.state;
        if (groupBy && groupBy.length > 0) {
        return (<GroupByList>
                    {
                        groupBy.map(v => (
                            <GroupByButton 
                                title={data.headData[v]}
                                onPress={() => this.setState({
                                    groupBy: _.filter(groupBy, v2 => v2 !== v)                                
                                })}
                            />
                            ))
                        }
                </GroupByList>); 
        }
        return <View />;
    }

    render() {
        const { data } = this.state;
        return (
            <ScrollView>
                {this.resolveGroupByList()}
                <ScrollView horizontal>
                <View style={{ padding: 20 }}>
                    {this.resolveTable()}
                    <FilterModal 
                        visible={this.props.filterVisible}
                        data={data}
                        onPressClose={this.props.onFilterClose}
                        onFilterChange={this.tableUpdate.bind(this)}
                        filter={this.state.filter}
                    />
                </View>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = {
    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 6,
    },
    headContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderLeftWidth: 1,
        color: '#333',
        flexDirection: 'row',
    },
    colContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tdContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        color: '#333',
        padding: 10,
        alignItems: 'center',
        minHeight: 40
    },
    sortByIconStyle: {
        position: 'absolute',
        top: 10,
        right: 0
    },
    elementContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    element: {
        color: '#337ab7',
    },
    elementDif: {
        paddingLeft: 4,
        paddingRight: 4
    }    
};
