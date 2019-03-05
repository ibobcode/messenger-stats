import React from 'react';
// import PropTypes from 'prop-types';
import { ResponsiveCalendar } from '@nivo/calendar';
import StyledWrapper from './style';

function History(props) {
  const data = {};
  props.conv.messages.nodes.forEach(m => {
    const d = new Date(Number(m.timestamp_precise));
    const label = `${d.getFullYear()}-${
      d.getMonth() + 1 < 10 ? '0' : ''
    }${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;
    data[label] = {
      day: label,
      value: data[label] ? data[label].value + 1 : 1,
    };
  });
  return (
    <StyledWrapper className="history" {...props}>
      <ResponsiveCalendar
        data={Object.values(data)}
        from={Object.values(data)[0].day}
        to="2019-03-01"
        emptyColor="#eeeeee"
        colors={[
          '#009dbb',
          '#41bdbb',
          '#94e3d5',
          '#cbf4d5',
          '#ffdd8b',
          '#ffa03a',
          '#ff703a',
        ]}
        margin={{
          top: 100,
          right: 30,
          bottom: 60,
          left: 30,
        }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        monthLegendOffset={10}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 34,
            itemHeight: 36,
            itemDirection: 'top-to-bottom',
          },
        ]}
      />
    </StyledWrapper>
  );
}

History.propTypes = {};

export default History;
