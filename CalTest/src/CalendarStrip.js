import moment, { Moment } from 'moment';
import PropTypes from "prop-types";
import * as React from 'react';
import { View,Text,ScrollView,FlatList,VirtualizedList } from 'react-native';
import styles from './Calendarstyle';
import {CalendarDay} from "./CalendarDay";
    function parseDate(d :any) {
        if (!d) {
        return;
        } else if (d) { 
        return moment(d,"MM-DD-YYYY");
        }
    }

    interface CalendarStripProps {
        startingDate: PropTypes.any,
        selectedDate: PropTypes.any, 
        onDateSelected: PropTypes.func
    }

    export class DateObject {
        key: string
        value: moment.Moment[]
    }
    
export class CalendarStrip extends React.PureComponent<CalendarStripProps> {
    constructor(props : CalendarStripProps) {
        super(props);
        let startingDate = moment(this.props.startingDate);
        let selectedDate : Moment;
        if (props.selectedDate) {
            selectedDate = parseDate(props.selectedDate);
          } else {
            selectedDate = new Moment();
          }
  
        this.state = {
            startingDate : startingDate,
            selectedDate : selectedDate,
            numberOfDaysInMonth : selectedDate.daysInMonth(selectedDate.year,selectedDate.month),
          };
    }
    
    renderFlatListItem(item : any) {
        console.log(item);
        return item;
    }
    
    onPress(date: moment.Moment) {
        console.log('onPress');
        this.setState({ selectedDate: date });
        this.render();
    }

    getItem(data: any, screenNumber: number): DateObject {
         const currentDate = moment(this.state.selectedDate);
         const dateOffset = (screenNumber - 1) * 7;

         let week = [];
        for (let i = -3; i <= 3; i++) {
            let day = currentDate.clone().add(dateOffset + i, 'day');
            week.push(day);
        }
        const baseDate = week[3];
        // return { key: baseDate, value: week }
        console.log(data[screenNumber]);
        return data[screenNumber];
    }

    render() {
        let datesRender = [];
        let dateList = this.state.numberOfDaysInMonth;
        for (let i = -3; i <= 3; i++) {
            let calendarDay = (
                <CalendarDay date = {this.state.selectedDate.clone().add(i, 'days') } onDateSelected = {this.onPress.bind(this)} />
            );
            datesRender.push(
                <View key={i} style={{ flex: 1 }}>
                {calendarDay}
              </View>
            );   
        }
        return (
            <View>
                <VirtualizedList  
                horizontal = {true} 
                data = {datesRender}
                extraData={this.state.selectedDate}
                
                getItemCount={() => 7}
                getItem={this.getItem.bind(this)}
                initialNumToRender = {7}
                initialScrollIndex={1}
                pagingEnabled
                    renderItem = {( { item }) => (
                        this.renderFlatListItem(item)
                    )}
                />
            </View>
          );
    }
}