import React from 'react';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryTooltip, VictoryLabel } from 'victory';

class Visualization extends React.Component {
    render() {
        return (
            <VictoryChart domainPadding={20} height={300} width={600}
            containerComponent={<VictoryContainer responsive={true}/>}
            animate={{
                duration: 1000,
                onLoad: { duration: 200 }
              }}>
                <VictoryBar
                style={{ data: { fill: 'A9A9A9' } }}
                data={this.props.data}
                labelComponent={<VictoryTooltip/>}
                x="grade"
                y="percentage"
                />
            </VictoryChart>
        )
    }
}

export default Visualization;