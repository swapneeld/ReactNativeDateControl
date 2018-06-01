import moment, { Moment } from 'moment';
import PropTypes from "prop-types";
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "./Calendarstyle.js";

function padNumber(n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
}
  
function parseDate(d :any) {
    if (!d) {
      return;
    } else if (d) { 
      return moment(d,"MM-DD-YYYY");
    }
}


interface CalendarDayProps {
    //month
    date: PropTypes.object.isRequired,
    onDateSelected: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    showDayName: boolean,
    showDayNumber: boolean
}

export class CalendarDay extends React.PureComponent<CalendarDayProps> {

    static defaultProps : Partial<CalendarDayProps> = {
        showDayName : true,
        showDayNumber : true
    }
    
    constructor(props : CalendarDayProps) {
        super(props);
        let selectedDate : Moment;
        if (props.date) {
          selectedDate = parseDate(props.date);
        } else {
          selectedDate = new Moment();
        }
        this.state = {
          selectedDate : selectedDate,
          numberOfDaysInMonth : selectedDate.daysInMonth(selectedDate.year,selectedDate.month),
        };
    }
    
    render() {
        let dateNumberStyle = [styles.dateNumber];
        let dateNameStyle = [styles.dateName];
        let dateViewStyle = [{ backgroundColor: "transparent" }];
        return(
            <View>
              {this.props.showDayNumber && (
                <Text
                  style={{fontSize:15, padding:15}}
                >
                  {this.state.selectedDate.date()}
                </Text>
              )}
              {this.props.showDayName && (
                <Text
                  style={ {fontSize:15, padding:15}}
                  allowFontScaling={this.props.allowDayTextScaling}
                >
                  {this.state.selectedDate.format("ddd")}            
                </Text>
              )}
            </View>
        );
    }
}
