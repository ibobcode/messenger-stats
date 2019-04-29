import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from '@nivo/pie';
import { Line } from '@nivo/line';
import StyledWrapper from './style';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function Average({ conv, filter }) {
  let dataDays = {};
  let dataMin = {};
  Object.values(filter).forEach(f => {
    if (f.status) {
      Object.keys(conv.data[f.id].messages).forEach(timestamp => {
        const d = new Date(Number(timestamp));
        const interval = new Date(d).getHours();
        dataDays[d.getDay()] = {
          id: days[d.getDay()],
          label: days[d.getDay()],
          value: dataDays[d.getDay()] ? dataDays[d.getDay()].value + 1 : 1,
        };
        dataMin[interval] = {
          x: interval,
          y: dataDays[d.getDay()] ? dataDays[d.getDay()].value + 1 : 1,
        };
      });
    }
  });
  Object.keys(dataDays).forEach(k => {
    dataDays[k].value /=
      Math.round((conv.latest - conv.oldest) / (7 * 24 * 60 * 60 * 1000)) + 1;
    dataDays[k].value = Math.floor(dataDays[k].value);
  });
  Object.keys(dataMin).forEach(k => {
    dataMin[k].y /=
      Math.round((conv.latest - conv.oldest) / (24 * 60 * 60 * 1000)) + 1;
    dataMin[k].y = Math.floor(dataMin[k].y);
  });
  dataDays = Object.values(dataDays);
  dataMin = [
    {
      id: 'daily',
      color: '#ff703a',
      data: Object.values(dataMin),
    },
  ];
  if (!dataDays[0]) {
    return '';
  }
  return (
    <StyledWrapper className="average">
      <div className="pie-container">
        <Pie
          data={dataDays}
          width={780}
          height={300}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          innerRadius={0.5}
          padAngle={5}
          cornerRadius={10}
          colors={{
            scheme: 'nivo',
          }}
          borderWidth={3}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={4}
          radialLabelsTextColor="#4a4a4a"
          radialLabelsLinkOffset={5}
          radialLabelsLinkDiagonalLength={10}
          radialLabelsLinkHorizontalLength={20}
          radialLabelsLinkStrokeWidth={3}
          radialLabelsLinkColor={{
            from: 'color',
          }}
          enableSlicesLabels={false}
          slicesLabelsSkipAngle={13}
          slicesLabelsTextColor="#333333"
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
      <div className="line-container">
        <Line
          width={500}
          height={50}
          data={dataMin}
          margin={{
            top: 5,
            right: 0,
            bottom: 5,
            left: 0,
          }}
          xScale={{
            type: 'point',
          }}
          yScale={{
            type: 'linear',
            stacked: true,
            min: 'auto',
            max: 'auto',
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors="#ff703a"
          curve="monotoneX"
          enableDots={false}
          dotSize={2}
          dotColor={{
            theme: 'background',
          }}
          dotBorderColor={{
            from: 'color',
          }}
          dotLabel="y"
          dotLabelYOffset={-12}
          areaOpacity={1}
          animate
          motionStiffness={90}
          motionDamping={15}
          legends={[]}
          tooltip={l => (
            <div>
              <span>{`${l.data[0].data.x}h / ${(l.data[0].data.x + 1) %
                24}h : `}</span>
              <span>
                <strong>{` ${l.data[0].data.y} messages`}</strong>
              </span>
            </div>
          )}
          isInteractive
          enableStackTooltip
        />
      </div>
    </StyledWrapper>
  );
}

Average.propTypes = {
  conv: PropTypes.object,
  filter: PropTypes.object,
};

export default Average;
