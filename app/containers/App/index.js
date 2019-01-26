import React, { Component } from 'react';
import './styles.css'
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQY8MrnIJfCDBtndRAKyY4PyZdaDVRXY0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  center: { lat: 59.908799, lng: 30.284972 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.center}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    {/*<InfoBox
      defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>

        </div>
      </div>
    </InfoBox>*/}
    <Marker
      position={{ lat: 59.907099, lng: 30.284972 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoBox
        onCloseClick={props.onToggleOpen}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            HДР ТУТ
          </div>
        </div>
      </InfoBox>}
    </Marker>
  </GoogleMap>
);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showText: false
    }
  }
  handleClick() {
    this.setState({ showText: !this.state.showText })
  }
  render() {
    const { showText } = this.state
    return (
      <div className='app'>
        <button onClick={this.handleClick.bind(this)}>{ showText ? 'HIDE' : 'SHOW' }</button>
        { showText && <div className='content'>
          <h1>ДЕНЬ РОЖДЕНИЯ /////</h1>
          <h1 className='odd'>///// ДЕНЬ РОЖДЕНИЯ </h1>
          <h1 className='odd'>ДЕНЬ РОЖДЕНИЯ /////</h1>
          <h1>ДЕНЬ РОЖДЕНИЯ /////</h1>
          <h1 className='odd'>ДЕНЬ РОЖДЕНИЯ /////</h1>
          <h1>ДЕНЬ РОЖДЕНИЯ /////</h1>
          <h1>ДЕНЬ РОЖДЕНИЯ /////</h1>
        </div>}
        <StyledMapWithAnInfoBox />
      </div>
    );
  }
}

export default App
