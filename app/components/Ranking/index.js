import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@nivo/bar';
import StyledWrapper from './style';

function Ranking({ conv, filter }) {
  const data = [];
  Object.values(filter).forEach(f => {
    if (f.status) {
      data.push({
        id: conv.data[f.id].id,
        name: `${conv.data[f.id].name.split(' ')[0]} ${
          conv.data[f.id].name.split(' ')[1][0]
        }`,
        text: conv.data[f.id].textCounter,
        pictures: conv.data[f.id].picsCounter,
        gifs: conv.data[f.id].gifsCounter,
        links: conv.data[f.id].linksCounter,
        files: conv.data[f.id].filesCounter,
        videos: conv.data[f.id].videosCounter,
      });
    }
  });
  return (
    <StyledWrapper className="history">
      <Bar
        data={data}
        keys={['text', 'pictures', 'gifs', 'links', 'files', 'videos']}
        indexBy="name"
        width={780}
        height={400}
        margin={{
          top: 10,
          right: 130,
          bottom: 50,
          left: 80,
        }}
        padding={0.3}
        innerPadding={4}
        layout="vertical"
        colors={{
          scheme: 'set2',
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 30,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
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
        animate
        motionStiffness={90}
        motionDamping={15}
      />
    </StyledWrapper>
  );
}

Ranking.propTypes = {
  conv: PropTypes.object,
  filter: PropTypes.object,
};

export default Ranking;
