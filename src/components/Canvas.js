import React from 'react';
import AddButton from './AddButton';
import SvgIcons from './SvgIcons';
import Row from './Row';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.props.rows || []
    };
  }

  render() {
    const { rows } = this.state;

    const styles = {
      height: this.props.height,
      width: this.props.width,
      padding: '3px 0'
    };

    const rowNodes = (rows && rows.length) ? rows.map((row, i) => {
      return (
        <Row key={row.id} onSave={(row) => this.save(i, row)} {...row} />
      );
    }) : null;

    return (
      <div className="canvas" style={styles}>
        { rowNodes }
        <a href="#" id="addBtn" onClick={(e) => this.addRow(e)}><AddButton /></a>
        <SvgIcons />
      </div>
    );
  }

  addRow(e) {
    e.preventDefault();
    const { rows } = this.state;
    rows.push({
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type: null,
          content: ''
        },
        {
          id: uuid(),
          type: null,
          content: ''
        }
      ]
    });
    this.setState({
      rows
    });
  }

  save(index, row) {
    const { rows } = this.state;
    const { onSave } = this.props;
    rows[index] = Object.assign({}, row);
    this.setState({
      rows
    });
    if (onSave) {
      const rowsHtml = rows.map(row => row.html);      
      const html = (`<div class="canvas">${rowsHtml}</div>`)
        .replace(/ {2}/g, '')
        .replace(/(\r\n|\r|\n)/g, '');

      const ast = HTMLParser.parse(html);

      // Trim HTML out of what we perist up to the API
      const rowsWithoutHtml = rows.map(zone => {
        const r = Object.assign({}, zone);
        delete r.html;
        if (r.zones && r.zones.length) {
          r.zones = r.zones.map(zone => {
            const z = Object.assign({}, zone);
            delete z.html;
            return z;
          });
        }
        return r;
      });

      onSave({
        rows: rowsWithoutHtml,
        ast,
        html: HTMLParser.stringify(ast)
      });
    }
  }

}

Canvas.propTypes = {
  onSave: React.PropTypes.func,
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  rows: React.PropTypes.array
};
