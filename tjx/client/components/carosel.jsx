import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Reveal from 'react-reveal';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class Carosel extends React.Component
{
  constructor()
  {
    super();
    this.state = {

    }
  }
  render()
  {
    return (
      <Zoom>
        <div className="carosel" style={{
          postion: "relative"
        }}>
          <AutoPlaySwipeableViews >
            <div >
              <img height="500px" width="100%" src="./images/car1.png"/>
            </div>
            <div>
              <img height="500px" width="100%" src="./images/car2.png"/>
            </div>
            <div>
              <img height="500px" width="100%" src="./images/car3.png"/>
            </div>
            <div>
              <img height="500px" width="100%" src="./images/car4.png"/>
            </div>
          </AutoPlaySwipeableViews>
        </div>
      </Zoom>
    );
  }
}
