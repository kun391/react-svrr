import React from 'react';
import PropTypes from 'prop-types';

class FaqItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toggle: false
    };
  }

  toggleBar(bar, desc) {
    $(`.${desc}`).stop().slideToggle();
    $(`.${bar}`).toggleClass('active');
  }

  componentDidMount() {
    $('.list-faq .item:first .bar-title').addClass('active');
  }

  render() {
    return (
      <li className="item">
        <div className="content">
          <h5 className={`bar-title bar${this.props.id}`} onClick={this.toggleBar.bind(this,  `bar${this.props.id}`, `desc${this.props.id}`)}><span className="line"></span>{this.props.title}</h5>
          <p className={`description desc${this.props.id}`}>{this.props.description}</p>
        </div>
      </li>
    );
  }
}

FaqItem.propTypes = {
  id: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string
};

export default FaqItem;