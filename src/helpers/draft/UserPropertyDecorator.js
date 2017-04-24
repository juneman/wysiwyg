import React from 'react';
import PropTypes from 'prop-types';

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findUserPropertyEntities(contentBlock, callback) {
  findWithRegex(/{{(.*?)}}/g, contentBlock, callback);
}

const UserProperty = (props) => {
  const { children } = props;

  return (
    <span style={{backgroundColor: '#bfebff'}}>{children}</span>
  );
};

UserProperty.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

export const UserPropertyDecorator = {
  strategy: findUserPropertyEntities,
  component: UserProperty
};
