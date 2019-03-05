import React from 'react';
// import PropTypes from 'prop-types';
import { ResponsiveSunburst } from '@nivo/sunburst';
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

function Average(props) {
  const data = {
    name: 'test',
    color: '#000',
  };
  const tempC = {};
  const nameId = {};
  props.conv.customization_info.participant_customizations.forEach(p => {
    nameId[p.participant_id] = p.nickname;
  });
  props.conv.messages.nodes.forEach(m => {
    if (!m.size) {
      const day = days[new Date(Number(m.timestamp_precise)).getDay()];
      if (!tempC[day]) {
        tempC[day] = {
          name: day,
          color: '#000',
          children: {},
        };
        props.conv.all_participants.edges.forEach(u => {
          tempC[day].children[u.node.messaging_actor.id] = {
            name: nameId[u.node.messaging_actor.id],
            color: '#000',
            msg: 0,
          };
        });
      }
      if (tempC[day].children[m.message_sender.id]) {
        tempC[day].children[m.message_sender.id].msg += 1;
      }
    }
  });
  data.children = Object.values(tempC);
  data.children.forEach(d => {
    // eslint-disable-next-line no-param-reassign
    d.children = Object.values(d.children);
  });
  return (
    <StyledWrapper className="history" {...props}>
      <ResponsiveSunburst
        data={data}
        margin={{
          top: 40,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        identity="name"
        value="msg"
        cornerRadius={45}
        borderWidth={2}
        borderColor="white"
        colors="paired"
        colorBy="id"
        childColor="inherit"
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive
      />
    </StyledWrapper>
  );
}

Average.propTypes = {};

export default Average;
