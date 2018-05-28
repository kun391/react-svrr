import React from 'react';
import PropTypes from 'prop-types';

class BlockHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleToggle() {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle();
    }
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="block-main-header">
        <div className="block-header">
          {
            this.props.addText
            ? <a href={this.props.link} className="btn-add-new" onClick={this.handleToggle.bind(this)}><span className="ficon ficon-add"></span><span className="text">{this.props.addText}</span></a>
            : null
          }
          <h4 className="block-title">
            <span className={`ficon ficon-${this.props.ficon}`}></span>{this.props.title}
            {
              this.props.number && this.props.number > 0
              ? <span className="text-gray">{this.props.number} {this.props.type}{this.props.number > 1 ? 's' : ''}</span>
              : null
            }
          </h4>
        </div>
      </div>
    );
  }
}

BlockHeader.propTypes = {
  ficon: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  link: PropTypes.string,
  type: PropTypes.string,
  addText: PropTypes.string
};

export default BlockHeader;
