import React from 'react';

import IconButton from './IconButton';

export default class FormRadioButton extends React.Component {
  render() {
    return (
      <IconButton
        title="form-radio"
        pathNode={
          <path d="M7.42858028,6.35713732 C7.42858028,7.38001801 6.5943159,8.21428239 5.57143521,8.21428239 C4.54855453,8.21428239 3.71429014,7.38001801 3.71429014,6.35713732 C3.71429014,5.33425664 4.54855453,4.49999225 5.57143521,4.49999225 C6.5943159,4.49999225 7.42858028,5.33425664 7.42858028,6.35713732 Z M5.57143521,2.41070405 C3.39509333,2.41070405 1.62500194,4.18079544 1.62500194,6.35713732 C1.62500194,8.5334792 3.39509333,10.3035706 5.57143521,10.3035706 C7.74777709,10.3035706 9.51786849,8.5334792 9.51786849,6.35713732 C9.51786849,4.18079544 7.74777709,2.41070405 5.57143521,2.41070405 Z M11.1428704,6.35713732 C11.1428704,9.43303385 8.64733174,11.9285725 5.57143521,11.9285725 C2.49553869,11.9285725 0,9.43303385 0,6.35713732 C0,3.2812408 2.49553869,0.785702109 5.57143521,0.785702109 C8.64733174,0.785702109 11.1428704,3.2812408 11.1428704,6.35713732 Z"></path>
        }
        viewBox="0 0 12 12"
        {...this.props}
      />
    );
  }
}
