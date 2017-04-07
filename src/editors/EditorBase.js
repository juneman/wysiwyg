import React from 'react';

export default class EditorBase extends React.Component {}

EditorBase.propTypes = {
  isEditing: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.object.isRequired
};
