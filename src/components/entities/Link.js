import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as editorActions from '../../actions/editorActions';
import HyperlinkInline from '../../editor-actions/HyperlinkInline';
import HyperlinkTooltip from '../../editor-inline-actions/HyperlinkTooltip';

class Link extends React.Component {

  constructor(props) {
    super(props);
    const { contentState, entityKey } = props;
    const { href, isNewWindow, color } = contentState.getEntity(entityKey).getData();

    this.state = {
      href,
      isNewWindow,
      color
    };

    this.onLinkClick = this.onLinkClick.bind(this);
  }

  onLinkClick() {
    const { dispatch, entityKey } = this.props;
    const { href } = this.state;
    const { top, left } = (this.el && this.el.getBoundingClientRect()) || {};
    dispatch(editorActions.toggleEditorInlineAction(HyperlinkTooltip.actionName, true, {
      href,
      top,
      left,
      node: this.el,
      entityKey
    }));
  }

  componentWillUpdate(nextProps) {
    const { href, isNewWindow, color } = nextProps.contentState.getEntity(nextProps.entityKey).getData();
    if (href !== this.state.href) {
      this.setState({ href });
    }
    if (isNewWindow !== this.state.isNewWindow) {
      this.setState({ isNewWindow });
    }
    if (color !== this.state.color) {
      this.setState({ color });
    }
  }

  render() {
    const { children } = this.props;
    const { tooltipVisible, color, href, isNewWindow } = this.state;

    return (
      <a ref={(el) => this.el = el} style={{ color }} href={href} target={(isNewWindow) ? '_blank' : '_self'} onClick={ this.onLinkClick }>
        { children }
      </a>
    );
  }
}

Link.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

export default connect()(Link)
