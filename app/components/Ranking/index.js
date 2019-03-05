import React from 'react';
// import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';
import StyledWrapper from './style';

function Ranking(props) {
  let data = [];
  const nameId = {};
  props.conv.customization_info.participant_customizations.forEach(p => {
    nameId[p.participant_id] = p.nickname;
  });
  props.conv.messages.nodes.forEach(m => {
    if (!m.size) {
      if (!data[m.message_sender.id]) {
        data[m.message_sender.id] = {
          messages: 0,
          id: nameId[m.message_sender.id],
          messagesColor: '#000',
        };
      }
      data[m.message_sender.id].messages += 1;
    }
  });
  data = Object.values(data);
  return (
    <StyledWrapper className="history" {...props}>
      <ResponsiveBar
        data={data}
        keys={['messages']}
        margin={{
          top: 50,
          right: 130,
          bottom: 50,
          left: 60,
        }}
        padding={0.3}
        colors="accent"
        colorBy="id"
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </StyledWrapper>
  );
}

Ranking.propTypes = {};

export default Ranking;
