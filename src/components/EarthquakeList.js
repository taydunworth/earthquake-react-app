import React, { Component } from 'react';
import moment from 'moment';

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'

class EarthquakeList extends Component {
  state = {
    features: []
  }

  componentDidMount() {
    fetch(url).then(res => res.json()).then(({ features}) => {
      this.setState({ features})
    })
  }

  render() {
    let earthquakes = this.state.features.map(earthquake => {
      return (
        <div className="col-sm-6" key={earthquake.id}>
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">{earthquake.properties.place}</h4>
              <h6 className="card-subtitle mb-2 text-muted"><strong>Magnitude:</strong> {earthquake.properties.mag}</h6>
              <h6 className="card-subtitle mb-2 text-muted"><strong>Time:</strong> {moment(earthquake.properties.time).format('llll')}</h6>
              <p className="card-text"><strong>Coordinates:</strong> {earthquake.geometry.coordinates}</p>
              <a href={earthquake.properties.url} className="card-link">USGS Event Link</a>
            </div>
          </div>
        </div>
        )
      })

    return (
      <div className="quake-list">
        <div className="row">
          {earthquakes}
        </div>
      </div>
    )
  }
}

export default EarthquakeList;
