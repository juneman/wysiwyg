import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Picker } from 'emoji-mart';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps, emojiPickerStyles, tabStyle, selectedTabStyle } from '../helpers/styles/editor';

import ImageButton from '../icons/ImageButton';
import ImageUploader from '../components/ImageUploader';
import { GALLERY_TYPES } from '../helpers/constants';

const BASE_SVG_URL = '//twemoji.maxcdn.com/2/svg/';


export default class ImageUploadWithPresets extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isMenuOpen: props.isActive || false,
      tabState: (props.galleryType) ? props.galleryType : 'upload',
      dropdownWidth: (props.galleryType == GALLERY_TYPES.EMOJI) ? 570 : 440,
      hasRoomToRenderRight: true
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
    const { isMenuOpen, tabState, dropdownWidth, hasRoomToRenderRight } = this.state;
    const { isActive, hasRoomToRenderBelow, galleryType } = this.props;

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
          src: '//res.cloudinary.com/dnjrorsut/image/upload/v1504649782/tk9kgigdjpvwfbstigqy_ghfv6h.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/v1504649795/qdorltjp5lsiv5rdb0ur_jjdypn.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/x4uc1yzmd0dhh6ljcste.png',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/qfqtt1rzcfuniw1u5kvv.png'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/zgpyya23z1muz25ohgza.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/lwrxgeujaakvarxdqxsr.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/csxijdtxrxqkip3cscqv.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/bplefflfgzq8qzc5mjq5.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/vsudv3f31erwrtrh3kxq.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/ho7i9ttcmnf1ezq7lofy.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/ruj5ysoiqmuqkxwllmix.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/bew13cceknmxg1uuhvy9.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/byxg9ket5bsid4piamuv.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/ipxsa7xctutqma2gikrz.jpg'
        },
        {
          type: 'url',
          src: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/fyye2tcrtoyyxrl2lupm.jpg',
          fullResSrc: '//res.cloudinary.com/dnjrorsut/image/upload/prod_hosted/appcues-dev/io9imwcj5ymmofy2yesy.jpg'
        }
      ]
    };

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
        { tabState == GALLERY_TYPES.EMOJI &&
            <div style={{padding: '4px 8px'}}>
                <style>
                    { emojiPickerStyles }
                </style>
                <Picker
                    autoFocus
                    perLine={15}
                    color="#23baff"
                    set='twitter'
                    onClick={(emoji) => this.pickEmoji(emoji)}
                    style={{width: '100%'}}
                    />
            </div>

        }
        { tabState == GALLERY_TYPES.HERO &&
          <div style={{padding: '4px 8px', height: 250, overflowY: 'scroll'}}>
            {
              Object.keys(presetGallery).map((key) =>
                <div key={key} style={{marginTop: 4}}>
                  <p style={{color: '#969696', textTransform: 'uppercase', marginBottom: 4, fontWeight: 800}}>{key}</p>
                  <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    {
                      presetGallery[key].map((galleryItem, i) => {
                        const style = {
                          backgroundImage: `${galleryItem.type}(${galleryItem.src})`,
                          backgroundSize: 'cover',
                          flexBasis: 100,
                          height: 50,
                          cursor: 'pointer',
                          margin: '0 3px 5px 3px',
                        };

                        return (
                          <div style={style} onClick={ () => this.selectFromGallery(galleryItem) } key={`${galleryItem.type}-${i}`}></div>
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

  pickEmoji(emoji) {
      const { localState, persistedState, onChange } = this.props;
      let url;
      //check to make sure that our
      //saved url matches what the twemoji cdn expects.
      if ((emoji.unified.match(new RegExp("-", "g")) || []).length == 1) {
          //Removes variant values introduced by emojiMart
          url =  `${BASE_SVG_URL}${emoji.unified.split('-fe0f')[0]}.svg`;
      } else if ((emoji.unified.match(new RegExp("20e3", "g")) || []).length == 1) {
           //Removes variant values introduced by emojiMart, and leading 00's
           url =  `${BASE_SVG_URL}${emoji.unified.slice(2).split('-fe0f')[0]}-20e3.svg`;
      } else {
          url = `${BASE_SVG_URL}${emoji.unified}.svg`;
      }

      let newPersistedState = persistedState
        .set('url', url)
        .set('width', 250)
        .set('textAlign', 'center');

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
