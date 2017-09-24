import React, {Component} from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import { compose, withProps, withState, withHandlers } from "recompose";
import {FaAnchor} from "react-icons/lib/fa/anchor";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
// const MapWithControlledZoom = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBMZ2MMy6qB1nXmmpgZ7XIgk3l9Uq9M0jo&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withState('zoom', 'onZoomChange', 8),
//   withHandlers(() => {
//     const refs = {
//       map: undefined,
//     }

//     return {
//       onMapMounted: () => ref => {
//         refs.map = ref
//       },
//       onZoomChanged: ({ onZoomChange }) => () => {
//         onZoomChange(refs.map.getZoom())
//       }
//     }
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultCenter={{ lat: this.state.ido, lng: this.state.keido }}
//     zoom={props.zoom}
//     ref={props.onMapMounted}
//     onZoomChanged={props.onZoomChanged}
//   >
//     <Marker
//       position={{ lat: this.state.ido, lng: this.state.keido }}
//       onClick={props.onToggleOpen}
//     >
//       <InfoWindow onCloseClick={props.onToggleOpen}>
//         <div>
//           <FaAnchor />
//           {" "}
//           Controlled zoom: {props.zoom}
//         </div>
//       </InfoWindow>
//     </Marker>
//   </GoogleMap>
// );

{/* <MapWithControlledZoom /> */}

// 検索結果（詳細情報）を定義するコンポーネント
export default class OsumAISoudanResultDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {facilities: []}
    this.api(this.props.station)
  }

  api (station) {
    request
    .get('/api/facilities/' + station)
    .end((err, res) => {
        const r = res.body
        if (err || !r.status) {
            // @TODO エラーメッセージ表示
            this.setState({msg: r.msg})
            alert(this.state.msg)
            return
        }
        console.log(r)
        if (r.status) {
            this.setState({ido: r.ido, keido: r.keido, facilities: r.facilities})
            return
            // return r.facilities
          }
    })
  }

render () {

    // いいねボタンの張りぼて
    const iine = () => (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button><Glyphicon glyph="thumbs-up" /></Button>
            <Button><Glyphicon glyph="thumbs-down" /></Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )

    const facilities = this.state.facilities.map(e => {
      return(
        <li>{e.name}　：　 {e.count}件</li>  
        // <li>{e.name}</li>  
      )
    })

    const MapWithControlledZoom = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBMZ2MMy6qB1nXmmpgZ7XIgk3l9Uq9M0jo&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withState('zoom', 'onZoomChange', 16),
      withHandlers(() => {
        const refs = {
          map: undefined,
        }
    
        return {
          onMapMounted: () => ref => {
            refs.map = ref
          },
          onZoomChanged: ({ onZoomChange }) => () => {
            onZoomChange(refs.map.getZoom())
          }
        }
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultCenter={{ lat: this.state.ido, lng: this.state.keido }}
        zoom={props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
      >
        <Marker
          position={{ lat: this.state.ido, lng: this.state.keido }}
          onClick={props.onToggleOpen}
        >
          {/* <InfoWindow onCloseClick={props.onToggleOpen}>
            <div>
              <FaAnchor />
              {" "}
              Controlled zoom: {props.zoom}
            </div>
          </InfoWindow> */}
        </Marker>
      </GoogleMap>
    );
        
    return (
      <div style={styles.osumai_result_area}>
        <div style={styles.osumai_result_container}>
          <div>■地域にある施設
            <ul>
              {/* 施設情報 */}
              {/* {this.facilitiesList()} */}
              {facilities}
            </ul>
          </div>
          <div className={`container`}>
            <MapWithControlledZoom />
          </div>
          {iine()}
        </div>
        <div style={styles.osumai_result_container}>
          <div>
            {/*この中に張りぼてを置く？ */}
            <span>■お金に関する情報</span>
            <div>
              <img src="/okane.png" />
            </div>
          </div>
          {iine()}
        </div>
      </div>
    )
  }
}
