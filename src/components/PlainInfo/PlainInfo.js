import React from 'react';

class PlainInfo extends React.Component {
    render() {
      var param = this.props.param;
      var unit = this.props.values[0].unit;
      return (
        <div>
          <h4>Information about <span className='bold'>{ param }</span>:</h4>
          <p>Average value for the dates defined: <span className="bold">{ this.props.average } { unit === 'number' ? param : unit }</span></p>
          <ul>
            {
              this.props.values.map(function(value, i){
                return <li key={i}>{ value.date }: { value.value } { value.unit === 'number' ? param : value.unit }</li>
              })
            }
          </ul>
        </div>
        )
    };
}

export default PlainInfo;