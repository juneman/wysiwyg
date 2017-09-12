import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState } from 'draft-js';
import HTMLParser from 'html-parse-stringify2';
import striptags from 'striptags';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';
import { getButtonStyleString, removeArrowStyle} from '../../helpers/styles/editor';
import { BUTTON_ACTION_TYPES, BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS } from '../../helpers/constants';

export default class ButtonEditor extends React.Component {

  componentWillMount() {
    const { persistedState, localState, onChange } = this.props;
    const content = persistedState.get('buttonText') || `OK, Got it!`;

    const initialEditorState = EditorState.createWithContent(convertFromHTML(content), decorator);
    this.handleEditorStateChange(initialEditorState);

    const marginTop = persistedState.get('marginTop');
    const marginBottom = persistedState.get('marginBottom');
    const buttonActionType = persistedState.get('buttonActionType');

    const isMarginTopSet = marginTop || marginTop === 0;
    const isMarginBottomSet = marginBottom || marginBottom === 0;
    const defaultButtonAction = buttonActionType !== 0 &&  !buttonActionType && BUTTON_ACTION_TYPES.NEXT_PAGE;

    const newPersistedState = persistedState
      .set('marginTop', isMarginTopSet ? marginTop : 5)
      .set('marginBottom', isMarginBottomSet ? marginBottom : 5)
      .set('buttonActionType', defaultButtonAction || buttonActionType)

    onChange({
      localState: localState,
      persistedState: newPersistedState
    })
  }

  shouldComponentUpdate(nextProps) {
    const { localState } = this.props;
    const hasButtonTextChanged = localState.get('buttonText') != nextProps.localState.get('buttonText');

    if (hasButtonTextChanged){
      return false;
    }

    return true;
  }

  render() {
    const { isEditing, persistedState, localState, zone } = this.props;

    const buttonText = persistedState.get('buttonText') || "OK, Got it!";

    const { textAlign, className, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();
    const buttonStyleProps = [ 'borderRadius', 'padding', 'width', 'fontSize'];
    const classNameString = (className && className.length) ? ' ' + className : '';

    const isMarginTopSet = marginTop || marginTop === 0;
    const isMarginBottomSet = marginBottom || marginBottom === 0;

    const containerStyle = {};
    containerStyle.textAlign = textAlign || 'center';
    containerStyle.marginTop = isMarginTopSet ? marginTop : 5;
    containerStyle.marginBottom = isMarginBottomSet ? marginBottom : 5;

    if (marginRight) {
      containerStyle.marginRight = marginRight;
    };
    if (marginLeft) {
      containerStyle.marginLeft = marginLeft;
    };
    containerStyle.width = '100%';

    const buttonStyle = {};
    buttonStyleProps.forEach((key) => {
      if (persistedState.get(key)) {
        buttonStyle[key] = persistedState.get(key);
      }
    });

    const updatedButtonStyle = {
      ...buttonStyle,
      textAlign: 'center'
    };

    return (
      <div className="button-wrapper appcues-actions-right appcues-actions-left" style={containerStyle}>
        { (isEditing) ? 
            <a className="appcues-button appcues-button-success"
              style={{display: 'inline-block', cursor: 'text', ...updatedButtonStyle }}
              suppressContentEditableWarning
              contentEditable
              onInput={ (e) => this.onChangeButtonText(e.target.textContent) }
              >{buttonText}
            </a>
           : 
            <a
              className={`appcues-button appcues-button-success ${classNameString}`}
              style={updatedButtonStyle}
              disabled={true}
              data-field-id={zone.get('id')}>
              {buttonText}
            </a>
        }
      </div>
    );
  }

  // Instance Method
  focus() {
   
  }

  onChangeButtonText(text) {
    const { persistedState, localState, onChange } = this.props;
    const newPersistedState = persistedState.set('buttonText', text);
    const newLocalState = localState.set('buttonText', text);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const htmlContent = convertToHTML(editorState);

    const newPersistedState = persistedState.set('content', htmlContent);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { content, textAlign, href, borderRadius, padding, fontSize, width, className, isNewWindow, buttonActionType, stepIndex, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const wrapperAttrs = {
      class: 'button-wrapper appcues-actions-right appcues-actions-left'
    };
    wrapperAttrs.style = `width:100%;textAlign:${textAlign ? textAlign : 'center'};`;

    const isMarginTopSet = marginTop || marginTop === 0;
    const isMarginBottomSet = marginBottom || marginBottom === 0;

    wrapperAttrs.style = wrapperAttrs.style + `marginTop:${isMarginTopSet ? marginTop : 5}px;`;
    wrapperAttrs.style = wrapperAttrs.style + `marginBottom:${isMarginBottomSet ? marginBottom : 5}px;`;
    if (marginRight) {
      wrapperAttrs.style = wrapperAttrs.style + `marginRight:${marginRight}px;`;
    };
    if (marginLeft) {
      wrapperAttrs.style = wrapperAttrs.style + `marginLeft:${marginLeft}px;`;
    };

    const buttonAttrs = {
      class: 'appcues-button-success appcues-button',
      ['data-field-id']: zone.get('id')
    };
    buttonAttrs.style = getButtonStyleString(borderRadius, padding, fontSize, width);

    switch (buttonActionType) {
      case BUTTON_ACTION_TYPES.URL:
        buttonAttrs.href = href;
        buttonAttrs.target = (isNewWindow) ? '_blank' : '_self';
        break;
      case BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS.includes(buttonActionType):
        buttonAttrs['data-step'] = buttonActionType;
        break;
      case BUTTON_ACTION_TYPES.CUSTOM_PAGE:
        buttonAttrs['data-step'] = stepIndex;
        break;
      default:
        buttonAttrs['data-step'] = BUTTON_ACTION_TYPES.NEXT_PAGE;
    }

    const buttonText = persistedState.get('buttonText') || "OK, Got it!";
    
    const buttonObj = {
      type: 'tag',
      name: 'a',
      voidElement: false,
      attrs: buttonAttrs,
      children: [
        {
          type: 'text',
          content: buttonText
        }
      ]
    };

    const removeArrowStyleObj = {
      type: 'tag',
      name: 'style',
      voidElement: false,
      attrs: null,
      children: [
        {
          type: 'text',
          content: removeArrowStyle
        }
      ]
    };

    const buttonWrapperChildren = [];
    if (buttonActionType ==  BUTTON_ACTION_TYPES.PREVIOUS_PAGE || buttonActionType === BUTTON_ACTION_TYPES.NEXT_PAGE) {
      buttonWrapperChildren.push(removeArrowStyleObj);
    };
    buttonWrapperChildren.push(buttonObj);

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'div',
      voidElement: false,
      attrs: wrapperAttrs,
      children: buttonWrapperChildren
    });

    return HTMLParser.stringify(ast);
  }

}

ButtonEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
