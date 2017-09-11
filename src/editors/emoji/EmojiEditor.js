import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import HTMLParser from 'html-parse-stringify2';
import { placeholderStyle } from '../../helpers/styles/editor';

export default class ImageEditor extends React.Component {

  render() {
    const { persistedState, isEditing, onClickEmptyState } = this.props;
    const { url, height, width, heightOverride, widthOverride, textAlign, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

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
    if (marginTop) {
      wrapperStyle.marginTop = marginTop;
    };
    if (marginRight) {
      wrapperStyle.marginRight = marginRight;
    };
    if (marginBottom) {
      wrapperStyle.marginBottom = marginBottom;
    };
    if (marginLeft) {
      wrapperStyle.marginLeft = marginLeft;
    };

    let node = (<div style={{height: 100, ...placeholderStyle}} >Click to add your Image</div>);
    if (url) {
      node = (<img src={url} style={{ height: heightOverride || height, width: widthOverride || width }} />);
    } else if (isEditing) {
      node = (
        <div
          style={ dropzoneStyle }
          onClick={ onClickEmptyState }
        >
          <div>
            <div>Click here to select an emoji.</div>
          </div>
        </div>
      );
    }

    return (
      <div className="image" style={wrapperStyle}>
        { node }
      </div>
    );
  }

  generateHTML(persistedState) {
    const { url, height, width, heightOverride, widthOverride, href, isNewWindow, textAlign, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    if (!url) {
      return '';
    }

    const wrapperAttrs = {
      class: 'image'
    };

    if (textAlign) {
      wrapperAttrs.style = `text-align:${textAlign};`;
    }

    if (marginTop) {
      wrapperAttrs.style = wrapperAttrs.style + `margin-top:${marginTop}px;`;
    };
    if (marginRight) {
      wrapperAttrs.style = wrapperAttrs.style + `margin-right:${marginRight}px;`;
    };
    if (marginBottom) {
      wrapperAttrs.style = wrapperAttrs.style + `margin-bottom:${marginBottom}px;`;
    };
    if (marginLeft) {
      wrapperAttrs.style = wrapperAttrs.style + `margin-left:${marginLeft}px;`;
    };

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
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  onClickEmptyState: PropTypes.func.isRequired
};

