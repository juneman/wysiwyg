import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import HTMLParser from 'html-parse-stringify2';
import { placeholderStyle } from '../../helpers/styles/editor';
import ImageUploader from '../../components/ImageUploader';

export default class ImageEditor extends React.Component {

  render() {
    const { persistedState, isEditing } = this.props;
    const { url, height, width, heightOverride, widthOverride, textAlign } = persistedState.toJS();

    const dropzoneStyle = {
      height: 70,
      paddingTop: 30,
      width: '100%',
      backgroundColor: '#dafeea',
      color: '#0bdc66',
      textAlign: 'center'
    };

    const wrapperStyle = {};
    if (textAlign) {
      wrapperStyle.textAlign = textAlign;
    }

    let node = (<div style={{height: 100, ...placeholderStyle}} >Click to add your Image</div>);
    if (url) {
      node = (<img src={url} height={heightOverride || height} width={widthOverride || width} />);
    } else if (isEditing) {
      node = (
        <ImageUploader
          onUpload={(imageDetails) => this.handleUpload(imageDetails)}
        >
          <div style={dropzoneStyle}>
            <div>Click here to select an image to upload</div>
            <div>or drag and drop an image</div>
          </div>
        </ImageUploader>
      );
    }

    return (
      <div className="image" style={wrapperStyle}>
        { node }
      </div>
    );
  }

  generateHTML(persistedState) {
    const { url, height, width, heightOverride, widthOverride, href, isNewWindow, textAlign } = persistedState.toJS();

    if (!url) {
      return '';
    }

    const wrapperAttrs = {
      class: 'image'
    };
    if (textAlign) {
      wrapperAttrs.style = `text-align:${textAlign};`;
    }
    const imageAttrs = {};
    if (height || heightOverride) {
      imageAttrs.height = heightOverride || height;
    }
    if (width || widthOverride) {
      imageAttrs.width = widthOverride || width;
    }

    const imageAst = {
      type: 'tag',
      name: 'img',
      voidElement: true,
      attrs: {
        src: url,
        ...imageAttrs
      }
    };

    const linkAst = {
      type: 'tag',
      name: 'a',
      voidElement: false,
      attrs: {
        href,
        target: (isNewWindow) ? '_blank' : '_self'
      },
      children: [imageAst]
    };

    const ast = [
      {
        type: 'tag',
        name: 'div',
        attrs: wrapperAttrs,
        voidElement: false,
        children: [(href) ? linkAst : imageAst]
      }
    ];

    return HTMLParser.stringify(ast);
  }

  // Instance Method
  focus() {
    // Do nothing for this editor
  }

  handleUpload(imageDetails) {
    const { url, height, width } = imageDetails;
    const { localState, persistedState, onChange, canvasPosition } = this.props;
    
    let newPersistedState = persistedState
      .set('url', url)
      .set('height', height)
      .set('width', width);

    // Make sure the uploaded image does not have a larger size than the canvas
    if (height > canvasPosition.get('height')) {
      newPersistedState = newPersistedState.set('heightOverride', canvasPosition.get('height'));
    }
    if (width > canvasPosition.get('width')) {
      newPersistedState = newPersistedState.set('widthOverride', canvasPosition.get('width'));
    }

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ImageEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};

