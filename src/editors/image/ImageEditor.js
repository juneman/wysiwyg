import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import HTMLParser from 'html-parse-stringify2';
import { placeholderStyle } from '../../helpers/styles/editor';
import ImageUploader from '../../components/ImageUploader';

export default class ImageEditor extends React.Component {

  render() {
    const { persistedState, isEditing } = this.props;
    const { url, height, width, heightOverride, widthOverride, textAlign, top, right, bottom, left } = persistedState.toJS();

    const dropzoneStyle = {
      paddingBottom: 30,
      paddingTop: 30,
      backgroundColor: '#dafeea',
      color: '#0bdc66',
      textAlign: 'center',
      borderRadius: 4,
      cursor: 'pointer',
      marginLeft: -23,
      width: 'calc(100% + 46px)'
    };

    const wrapperStyle = {};
    if (textAlign) {
      wrapperStyle.textAlign = textAlign;
    };
    if (top) {
      wrapperStyle.marginTop = top;
    };
    if (right) {
      wrapperStyle.marginRight = right;
    };
    if (bottom) {
      wrapperStyle.marginBottom = bottom;
    };
    if (left) {
      wrapperStyle.marginLeft = left;
    };

    let node = (<div style={{height: 100, ...placeholderStyle}} >Click to add your Image</div>);
    if (url) {
      node = (<img src={url} style={{ height: heightOverride || height, width: widthOverride || width }} />);
    } else if (isEditing) {
      node = (
        <ImageUploader
          style={ dropzoneStyle }
          onUpload={(imageDetails) => this.handleUpload(imageDetails)}
        >
          <div>
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
    const { url, height, width, heightOverride, widthOverride, href, isNewWindow, textAlign, top, right, bottom, left } = persistedState.toJS();

    if (!url) {
      return '';
    }

    const wrapperAttrs = {
      class: 'image'
    };

    if (textAlign) {
      wrapperAttrs.style = `text-align:${textAlign};`;
    }

    const isNotDefaultMargins = top || right || bottom || left;
    if (isNotDefaultMargins) {
      if (top) {
        wrapperAttrs.style = wrapperAttrs.style + `margin-top:${top}px;`;
      };
      if (right) {
        wrapperAttrs.style = wrapperAttrs.style + `margin-right:${right}px;`;
      };
      if (bottom) {
        wrapperAttrs.style = wrapperAttrs.style + `margin-bottom:${bottom}px;`;
      };
      if (left) {
        wrapperAttrs.style = wrapperAttrs.style + `margin-left:${left}px;`;
      };
    } 

    const imageAttrs = {style: ""};
    if (height || heightOverride) {
      imageAttrs.style = `${ imageAttrs.style } height: ${ heightOverride || height }px;`;
    }
    if (width || widthOverride) {
      imageAttrs.style = `${ imageAttrs.style } width: ${ widthOverride || width }px`;
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
    const { url, width } = imageDetails;
    const { localState, persistedState, onChange, canvasPosition } = this.props;
    
    let newPersistedState = persistedState
      .set('url', url)
      .set('width', width)
      .set('textAlign', 'center');

    // Make sure the uploaded image does not have a larger size than the canvas
    if (width > canvasPosition.get('width')) {
      newPersistedState = newPersistedState.set('widthOverride', canvasPosition.get('width'));
    }

    onChange({
      localState,
      persistedState: newPersistedState,
      html: this.generateHTML(newPersistedState)
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

