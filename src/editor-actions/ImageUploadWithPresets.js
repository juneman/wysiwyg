import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps, tabStyle, selectedTabStyle } from '../helpers/styles/editor';
import { presetGallery } from '../helpers/presets';

import ImageButton from '../icons/ImageButton';
import ImageUploader from '../components/ImageUploader';
import { GALLERY_TYPES } from '../helpers/constants';


export default class ImageUploadWithPresets extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isMenuOpen: props.isActive || false,
      tabState: (props.galleryType) ? props.galleryType : 'upload',
      dropdownWidth: 440,
      hasRoomToRenderRight: true,
      selectedItemKey: null
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }


  render() {
    const { isMenuOpen, tabState, dropdownWidth, hasRoomToRenderRight, selectedItemKey } = this.state;
    const { isActive, hasRoomToRenderBelow, galleryType } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      width: dropdownWidth,
      overflow: 'hidden',
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if(!hasRoomToRenderRight) {
        dropdownStyles.right = dropdownStyles.left;
        delete dropdownStyles.left;
    }
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={{display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #e1e1e1'}}>
          { galleryType &&
              <span style={ {...tabStyle, ...(tabState == galleryType) ? selectedTabStyle : {}} } onClick={ () => this.setTabView(galleryType) }>
                  { galleryType }
              </span>
          }
          <span style={  {...tabStyle, ...(tabState == 'upload') ? selectedTabStyle : {}} }  onClick={ () => this.setTabView('upload') }>Upload image</span>
        </div>
        { tabState == GALLERY_TYPES.HERO &&
          <div style={{padding: '4px 8px', height: 250, overflowY: 'scroll'}}>
            {
              Object.keys(presetGallery).map((key) =>
                <div key={key} style={{marginTop: 4}}>
                  <p style={{color: '#969696', textTransform: 'uppercase', marginBottom: 4, fontWeight: 800}}>{key}</p>
                  <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    {
                      presetGallery[key].map((galleryItem, i) => {
                        const imageKey = `${key}-${i}`;
                        const style = {
                          backgroundImage: `${galleryItem.type}(${galleryItem.src})`,
                          backgroundSize: 'cover',
                          flexBasis: 100,
                          margin: '3px',
                          height: 50,
                          cursor: 'pointer',
                          position: 'relative'
                        };

                        const selectedItemIndicator = {
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translateY(-50%) translateX(-50%)',
                          width: 8,
                          height: 8,
                          background: '#fff',
                          borderRadius: 8
                        };

                        return (
                          <div style={style} onClick={ () => this.selectFromGallery(galleryItem, imageKey) } key={imageKey}>
                            { (imageKey === selectedItemKey) &&
                              <div className="selectedItemIndicator" style={selectedItemIndicator} />
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              )
            }
          </div>
        }
        { tabState == 'upload' &&
          <ImageUploader
            onUpload={(imageDetails) => this.handleUpload(imageDetails)}>
            <div style={{ cursor: 'pointer', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', margin: '8px', borderRadius: '4px', background: '#d4fee6', border: '2px dashed #0bdc66'}}>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{color: 'hsl(146, 90%, 43%)'}}>
                  <div style={{fontSize: 'larger', marginTop: 10}}>Click here to add some content</div>
                  <div style={{fontSize: 'smaller', marginTop: 10}}>or drag and drop an image</div>
                  <div style={{fontSize: 'smaller', padding: 4}}>(Recommended Dimensions: 1200px min width, 600px max height)</div>
                </div>
              </div>
            </div>
          </ImageUploader>
        }
      </Menu>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <ImageButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  setTabView(selectedTab) {
    const { tabState } = this.state;

    if (selectedTab == tabState) return null;

    this.setState({
      tabState: selectedTab
    });
  }

  selectFromGallery(selectedItem, key) {
    const { localState, persistedState, onChange, maxWidth } = this.props;

    this.setState({
      selectedItemKey: key
    });

    let newPersistedState = persistedState
      .set('backgroundType', selectedItem.type)
      .set('width', maxWidth)
      .set('textAlign', 'center');

    if (selectedItem.type == 'url') {
      newPersistedState = newPersistedState
        .set('url', selectedItem.fullResSrc)
        .set('gradient', null);
    } else if (selectedItem.type == 'linear-gradient') {
      newPersistedState = newPersistedState
        .set('url', null)
        .set('gradient', selectedItem.src);
    }

    onChange({
      localState,
      persistedState: newPersistedState
    });

  }

  handleUpload(imageDetails) {
    const { url, width } = imageDetails;
    const { localState, persistedState, onChange, maxWidth } = this.props;

    const urlWithoutProtocol = url.replace(/^https?\:\/\//i, "//");

    let newPersistedState = persistedState
      .set('url', urlWithoutProtocol)
      .set('backgroundType', 'url')
      .set('width', width)
      .set('textAlign', 'center');

    // Make sure the uploaded image does not have a larger size than available
    if (maxWidth && width > maxWidth) {
      newPersistedState = newPersistedState.set('widthOverride', maxWidth);
    }

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  setBoundingBox() {
    const { dropdownWidth } = this.state;
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());

    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
    //only switch if the full dropdown will fit
    if ((position.get('left') + dropdownWidth) > window.innerWidth && (position.get('right') - dropdownWidth) > 0) {
        this.setState({
            hasRoomToRenderRight: false
        });
    }
  }

}

ImageUploadWithPresets.propTypes = {
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  maxWidth: PropTypes.number,
  galleryType: PropTypes.string
};
