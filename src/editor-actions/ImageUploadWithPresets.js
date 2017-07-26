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
                src: 'to left, #35aae6, #35aae6'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #138dcb, #138dcb'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #0c4d6e, #0c4d6e'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #ff7145, #ff7145'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #da3e0d, #da3e0d'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #8630f5, #8630f5'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #613593, #613593'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #0bdc66, #0bdc66'
            },
            {
                type: 'linear-gradient',
                src: 'to left, #00b84f, #00b84f'
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
            },
            {
                type: 'linear-gradient',
                src: '-142deg, #50A6ED 0%, #34E8AD 100%'
            },
            {
                type: 'linear-gradient',
                src: '-153deg, #AD50ED 0%, #34E8AD 100%'
            },
            {
                type: 'linear-gradient',
                src: '-155deg, #7D4E4E 0%, #4E9E84 100%'
            },
            {
                type: 'linear-gradient',
                src: '-110deg, #0C4D6E 0%, #4E9E84 100%'
            },
        ],
        'image': [
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581442/appcues-dev/tk9kgigdjpvwfbstigqy.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/c_lfill,q_90,w_800/v1496931466/14981/qdorltjp5lsiv5rdb0ur.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581529/appcues-dev/x4uc1yzmd0dhh6ljcste.png',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097446/appcues-dev/qfqtt1rzcfuniw1u5kvv.png'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500580947/appcues-dev/zgpyya23z1muz25ohgza.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097510/appcues-dev/lwrxgeujaakvarxdqxsr.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581353/appcues-dev/csxijdtxrxqkip3cscqv.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097550/appcues-dev/bplefflfgzq8qzc5mjq5.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581210/appcues-dev/vsudv3f31erwrtrh3kxq.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097598/appcues-dev/ho7i9ttcmnf1ezq7lofy.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581160/appcues-dev/ruj5ysoiqmuqkxwllmix.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097625/appcues-dev/bew13cceknmxg1uuhvy9.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581076/appcues-dev/byxg9ket5bsid4piamuv.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097649/appcues-dev/ipxsa7xctutqma2gikrz.jpg'
            },
            {
                type: 'url',
                src: '//res.cloudinary.com/appcues-dev/image/upload/v1500581019/appcues-dev/fyye2tcrtoyyxrl2lupm.jpg',
                fullResSrc: '//res.cloudinary.com/appcues-dev/image/upload/v1501097667/appcues-dev/io9imwcj5ymmofy2yesy.jpg'
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

  selectFromGallery(selectedItem) {
    const { localState, persistedState, onChange, maxWidth } = this.props;


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

    console.log(urlWithoutProtocol);

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
