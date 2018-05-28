import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MeetingItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showRsvp: false
    };

    this.rsvp = [
      {value: true, label: 'Yes'},
      {value: false, label: 'No'},
      {value: null, label: '---'}
    ]
  }

  showRsvp() {
    this.setState({
      showRsvp: !this.state.showRsvp
    });
  }

  changeRsvp(id, item) {
    this.showRsvp();
    this.props.onRsvp(id, item);
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.name}</td>
        <td>
          {
            this.state.showRsvp
            ? <div className="form-rsvp">
                <Select
                  name="select-picker"
                  value={this.props.data.rsvp === 'Yes' ? true : (this.props.data.rsvp === 'No' ? false : null)}
                  options={this.rsvp}
                  onChange={this.changeRsvp.bind(this, this.props.data.pk)}
                  clearable={false}
                  searchable={false}
                  placeholder="---"
                />
                <span className="btn-cancel" onClick={this.showRsvp.bind(this)}>cancel</span>
              </div>
            : <div className="rsvp">
                <span className="text">{this.props.data.rsvp}</span>
                {
                  this.props.type !== 'past' && ((this.props.member && this.props.member.is_admin) || (this.props.currentUserId === this.props.data.pk))
                  ? <span className="ficon-pencil btn-edit pl10" onClick={this.showRsvp.bind(this)}></span>
                  : null
                }
              </div>
          }
        </td>
        <td>{this.props.data.rating}</td>
      </tr>
    );
  }
}

MeetingItem.propTypes = {
  meeting: PropTypes.object,
  member: PropTypes.object,
  data: PropTypes.object,
  onRsvp: PropTypes.func
};

export default MeetingItem;
