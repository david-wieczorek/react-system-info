import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from '../Axes'
import Bars from '../Bars'
import ResponsiveWrapper from '../ResponsiveWrapper'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 500
    }

    const maxValue = Math.max(...this.props.data.map(d => d.value))

    const xScale = this.xScale
      .padding(0.5)
      .domain(this.props.data.map(d => d.date))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    var param = this.props.param;
    var unit = this.props.data[0].unit;

    return (
      <div>
        <h4>Information about <span className='bold'>{ param }</span>:</h4>
        <p>Average value for the dates defined: <span className="bold">{ this.props.average } { unit === 'number' ? param : unit }</span></p>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
          />
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={this.props.data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        </svg>
      </div>
    )
  }
}

export default ResponsiveWrapper(Chart)