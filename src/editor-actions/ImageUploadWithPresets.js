import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps } from '../helpers/styles/editor';

import ImageButton from '../icons/ImageButton';
import ImageUploader from '../components/ImageUploader';


export default class ImageUploadWithPresets extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isMenuOpen: props.isActive || false,
      tabState: 'gallery'
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
    const { position, isMenuOpen, tabState } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const presetGallery = {
        'solid': [
            {
                type: 'linear-gradient',
                src: 'to left, #00A27E, #00A27E'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #259fe4, #259fe4'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #142b38, #142b38'
            }
        ],
        'gradient': [
            {
                type: 'linear-gradient',
                src: 'to left, #fc4a1a, #f7b733'
            },
            {
                type: 'linear-gradient',
                src: 'to right, #360033, #0b8793'
            }
        ],
        'image': [
            {
                type: 'url',
                src: 'https://res.cloudinary.com/appcues-dev/image/upload/c_lfill,q_90,w_800/v1496931466/14981/qdorltjp5lsiv5rdb0ur.jpg'
            },
            {
                type: 'url',
                src: 'https://res.cloudinary.com/appcues-dev/image/upload/v1495142286/14932/f88gmzhnenh7c9drv9ks.png'
            }
        ]
    };

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left,
      width: 328,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const tabStyle = {
        cursor: 'pointer',
        color: '#969696',
        backgroundColor: '#fff',
        textAlign: 'center',
        fontWeight: 600,
        width: '50%',
        transition: 'background-color 0.15s ease-out, color 0.15s ease-out'
    };

    const selectedTabStyle = {
        borderBottom: '1px solid #23baff',
        color: '#fff',
        backgroundColor: '#23baff'
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={{display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #e1e1e1'}}>
            <span style={ {...tabStyle, ...(tabState == 'gallery') ? selectedTabStyle : {}} } onClick={ () => this.setTabView('gallery') }>Gallery</span>
            <span style={  {...tabStyle, ...(tabState == 'upload') ? selectedTabStyle : {}} }  onClick={ () => this.setTabView('upload') }>Upload</span>
        </div>
        { tabState == 'gallery' &&
            <div style={{padding: '4px 8px', height: 150, overflowY: 'scroll'}}>
                {
                    Object.keys(presetGallery).map((key) => {
                        return(
                            <div key={key} style={{marginTop: 4}}>
                                <p style={{color: '#969696', textTransform: 'uppercase', marginBottom: 4, fontWeight: 800}}>{key}</p>
                                <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                                    {  presetGallery[key].map((galleryItem, i) => {
                                        const style = {
                                            backgroundImage: `${galleryItem.type}(${galleryItem.src})`,
                                            backgroundSize: 'cover',
                                            flexBasis: 100,
                                            height: 50,
                                            cursor: 'pointer',
                                            margin: '0 2px 5px 2px',
                                        };

                                        return (
                                            <div style={style} onClick={ () => this.selectFromGallery(galleryItem) } key={`${galleryItem.type}-${i}`}></div>
                                        );
                                    }) }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        }
        { tabState == 'upload' &&
                  <ImageUploader
                        onUpload={(imageDetails) => this.handleUpload(imageDetails)}
                    >
                    <div
                        style={{ cursor: 'pointer', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', margin: '8px', borderRadius: '4px', background: '#d4fee6', border: '2px dashed #0bdc66'}}>
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{color: 'hsl(146, 90%, 43%)'}}>
                                <div style={{fontSize: 'larger', marginTop: 10}}>Click here to add some content</div>
                                <div style={{fontSize: 'smaller', marginTop: 10}}>or drag and drop an image</div>
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

  selectFromGallery(selectedItem) {
    const { localState, persistedState, onChange, maxWidth } = this.props;


    let newPersistedState = persistedState
    .set('backgroundType', selectedItem.type)
    .set('width', maxWidth)
    .set('textAlign', 'center');

    if (selectedItem.type == 'url') {
        let urlWithoutProtocol = selectedItem.src.replace(/^https?\:\/\//i, "//");
        newPersistedState = newPersistedState
        .set('url', urlWithoutProtocol)
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
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
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
  maxWidth: PropTypes.number
};
