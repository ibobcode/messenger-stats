import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveCalendar } from '@nivo/calendar';
import StyledWrapper from './style';

function History({ conv, filter }) {
  const data = {};
  Object.values(filter).forEach(f => {
    if (f.status) {
      Object.keys(conv.data[f.id].messages).forEach(timestamp => {
        const d = new Date(Number(timestamp));
        const label = `${d.getFullYear()}-${
          d.getMonth() + 1 < 10 ? '0' : ''
        }${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;
        data[label] = {
          day: label,
          value: data[label] ? data[label].value + 1 : 1,
        };
      });
    }
  });
  if (!Object.values(data)[0]) {
    return '';
  }
  const min = Object.values(data).reduce(
    (m, val) =>
      new Date(m.day).getTime() < new Date(val.day).getTime() ? m : val,
  );
  console.log(min.day);
  return (
    <StyledWrapper className="history">
      <ResponsiveCalendar
        data={Object.values(data)}
        from={min.day}
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

History.propTypes = {
  conv: PropTypes.object,
  filter: PropTypes.object,
};

export default History;
