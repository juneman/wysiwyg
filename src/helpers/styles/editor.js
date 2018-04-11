
export function getButtonProps(isActive) {
  return {
    hideBackground: true,
    color: (isActive) ? '#23baff' : '#808080',
    clickColor: '#333',
    activeColor: '#23baff',
    hoverColor: (isActive) ? '#23baff' : '#333'
  };
}

export const tabStyle = {
  flexGrow: 1,
  cursor: 'pointer',
  color: '#969696',
  backgroundColor: '#fff',
  textAlign: 'center',
  fontWeight: 600,
  width: '50%',
  transition: 'background-color 0.15s ease-out, color 0.15s ease-out',
  textTransform: 'capitalize',
  padding: '5px 0'
};

export const selectedTabStyle = {
  color: '#fff',
  backgroundColor: '#23baff'
};

export const secondaryMenuTitleStyle = {
  textTransform: 'uppercase',
  fontSize: '14px',
  fontWeight: 600,
  color: '#808080',
  marginBottom: 16
};

export const selectMenuStyle = {
  background: 'transparent',
  border: '1px solid rgba(128, 128, 128, 0.5)',
  fontSize: '13px',
  height: '29px',
  padding: '5px',
  width: '175px',
  cursor: 'pointer'
};

export const getButtonStyleString = (borderRadius, padding, fontSize, width) => {

  let buttonStyleString = 'text-align:center;';

  if (borderRadius) {
    buttonStyleString = buttonStyleString + `border-radius:${borderRadius}px;`;
  }

  buttonStyleString = buttonStyleString + `padding:${padding ? (padding + 'px') : '8px 18px'};`;

  if (fontSize) {
    buttonStyleString = buttonStyleString + `font-size:${fontSize}px;`;
  }
  if (width) {
    buttonStyleString = buttonStyleString + `width:${width}px;`;
  }

  return buttonStyleString;
};

export const buttonNavTypeWrapperStyle = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-evenly',
  ['-webkit-font-smoothing']: 'antialiased'
};

export const labelStyle = {
  fontSize: '14px',
  display: 'flex',
  paddingTop: 5,
  marginBottom: 8,
  fontWeight: 400,
  color: '#888',
  lineHeight: 'normal'
};

export const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column'
};

export const buttonNavTypeMenuStyle = {
  margin: '16px 8px'
};

export const inputStyle = {
  outline: 'none',
  display: 'flex',
  padding: '5px 10px',
  borderRadius: 4,
  border: '2px solid #ddd',
  backgroundColor: 'white',
  lineHeight: '24px',
  fontSize: '14px',
  color: '#666'
};

export const shortInputStyle = {
  ...inputStyle,
  width: 62
};

export const marginBoxRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5px 0'
};

export const marginBoxStyle = {
  height: '50px',
  width: '60px',
  margin: '5px 15px',
  border: '2px dashed #808080'
};

export const dropdownStyle = {
  position: 'absolute',
  top: 45,
  left: 0,
  padding: '12px 15px 15px',
  animationTimingFunction: 'ease-out',
  animationDuration: '0.15s',
  animationIterationCount: 1,
  animationFillMode: 'both',
  backgroundColor: '#F7F7F7',
  zIndex: 10,
  ['-webkit-font-smoothing']: 'antialiased'
};

export const buttonStyleOptionStyle = {
  width: '45%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px'
};

export const checkboxStyle = {
  marginRight: 10,
  marginTop: 4
};

export const placeholderStyle = {
  textAlign: 'center',
  color: '#808080',
  fontSize: 'smaller',
  textTransform: 'uppercase'
};

export const removeArrowStyle = '.button-wrapper>[data-step=prev]::before {content: none} .button-wrapper>.appcues-button[data-step=next]::after {content: none}';

export const emojiPickerStyles = `.emoji-mart,
.emoji-mart * {
  box-sizing: border-box;
  line-height: 1.15;
  color: inherit
}

.emoji-mart {
  font-size: 16px;
  display: inline-block;
}

.emoji-mart .emoji-mart-emoji {
  padding: 6px;
}

.emoji-mart .emoji-mart-emoji, .emoji-mart .emoji-mart-emoji * {
  cursor: pointer;
}

.emoji-mart-bar:first-child {
  background: #e9e9e9;
  border-radius: 4px;
  width: 70%;
  display: inline-block;
  height: 36px;
}
.emoji-mart-bar:last-child {
  display: none;
}

.emoji-mart-anchors {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  color: #858585;
  line-height: 0;
  cursor: pointer;
}

.emoji-mart-anchor {
  position: relative;
  flex: 1;
  text-align: center;
  padding: 8px 0 4px;
  overflow: hidden;
  transition: color .1s ease-out;
}
.emoji-mart-anchor:hover,
.emoji-mart-anchor-selected {
  color: #464646;
}

.emoji-mart-anchor-selected .emoji-mart-anchor-bar {
  bottom: 0;
}

.emoji-mart-anchor-bar {
  position: absolute;
  bottom: -3px; left: 0;
  width: 100%; height: 3px;
  background-color: #464646;
}

.emoji-mart-anchors i {
  display: inline-block;
  width: 100%;
  max-width: 22px;
}

.emoji-mart-anchors svg {
  fill: currentColor;
  max-height: 18px;
}

.emoji-mart-scroll {
  overflow-y: scroll;
  height: 120px;
  padding: 0 6px 6px 6px;
}

.emoji-mart-search {
  width: 30%;
  height: 36px;
  display: inline-flex;
  vertical-align: bottom;
  justify-content: center;
  align-items: center;
}
.emoji-mart-search input {
  font-size: 16px;
  line-height: 24px;
  height: 100%;
  display: block;
  width: 100%;
  padding: .2em .6em;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  outline: 0;
  margin: 0 4px;
}

.emoji-mart-category .emoji-mart-emoji span {
  z-index: 1;
  position: relative;
  text-align: center;
}

.emoji-mart-category .emoji-mart-emoji:hover:before {
  z-index: 0;
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #f4f4f4;
  border-radius: 100%;
}

.emoji-mart-category-label {
  z-index: 2;
  position: relative;
  top: 0;
}

.emoji-mart-category-label span {
  display: block;
  width: 100%;
  font-weight: 500;
  padding: 5px 6px;
}

.emoji-mart-emoji {
  position: relative;
  display: inline-block;
  font-size: 0;
}

.emoji-mart-no-results {
  font-size: 14px;
  text-align: center;
  color: #858585;
}
.emoji-mart-no-results .emoji-mart-category-label {
  display: none;
}
.emoji-mart-no-results .emoji-mart-no-results-label {
  margin-top: .2em;
}
.emoji-mart-no-results .emoji-mart-emoji:hover:before {
  content: none;
}

.emoji-mart-preview {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.emoji-mart-preview-emoji, .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon, .emoji-mart-preview-skins, emoji-mart-title-label  {
  display: none;
}`;

export const editorButtonStyle = {
  alignItems: 'center',
  backgroundColor: '#23baff',
  border: 'none',
  borderRadius: '4px',
  color: 'rgba(255, 255, 255, 0.9)',
  cursor: 'pointer',
  display: 'inline-flex',
  float: 'right',
  fontSize: '15px',
  fontWeight: 500,
  justifyContent: 'center',
  marginTop: '10px',
  outline: 'none',
  padding: '9px 12px 8px',
  textAlign: 'center',
  width: '40%',
};
