import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

var sourceUrl;

export default class App extends Component {



    constructor(props) {
        super(props);
        this.setNewOption = this.setNewOption.bind(this);
        if(Platform.OS !== 'ios'){
            sourceUrl={{uri: 'file:///android_asset/tpl.html'}}
        }else{
            sourceUrl={require('./tpl.html')
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.option !== this.props.option) {
            // this.refs.chart.reload();
            this.refs.chart.injectJavaScript(renderChart(nextProps, false));
        }
    }

    setNewOption(option) {
        this.refs.chart.postMessage(JSON.stringify(option));
    }

    render() {
        return (
            <View style={{flex: 1, height: this.props.height || 400,}}>
    <WebView
        ref="chart"
        scrollEnabled = {false}
        injectedJavaScript = {renderChart(this.props)}
        style={{
            height: this.props.height || 400,
                backgroundColor: this.props.backgroundColor || 'transparent'
        }}
        scalesPageToFit={Platform.OS !== 'ios'}
        source=sourceUrl
        onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
    />
    </View>
    );
    }
}
