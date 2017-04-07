import React from 'react';

export default class EditorBase extends React.Component {}

EditorBase.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  content: React.PropTypes.string.isRequired
};
