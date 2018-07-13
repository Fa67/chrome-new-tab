/*
 * File: SummaryQuestion.jsx
 * Project: Chrome New Tab
 * File Created: Monday, 9th July 2018 2:31:06 pm
 * Description:
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Thursday, 12th July 2018 10:58:11 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import './SummaryQuestion.scss';
import MaterialIcon from '../../../../../node_modules/react-google-material-icons';

export class SummaryQuestion extends Component {
  static propTypes = {
    question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      options: PropTypes.array.isRequired,
      topOption: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    userGuid: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired,
    userOption: PropTypes.string.isRequired
  };

  // login to Facebook, don't require info
  loginAndRedirect = url => {
    Meteor.loginWithFacebook({ requestPermissions: [] }, function(err) {
      if (err) {
        console.error(err);
      } else {
        window.open(url, '_blank');
      }
    });
  };

  renderStatus = () => (
    <div className="sum-icon">
      {this.props.answered ? (
        <span id="vote-yes">
          <MaterialIcon icon="check_circle" size={28} />
        </span>
      ) : (
        <span id="vote-no">
          <MaterialIcon icon="contact_support" id="vote-no" size={32} />
        </span>
      )}
    </div>
  );

  render() {
    return (
      <div className="summary-q">
        {this.renderStatus()}
        <div className="sum-title">{this.props.question.title}</div>
        <div className="sum-popular">{this.props.question.topOption.title}</div>
        <div className="sum-user">
          {this.props.answered ? this.props.userOption : ''}
        </div>
        <div className="sum-link">
          <button
            className="summary-q-button"
            onClick={() => this.loginAndRedirect(this.props.question.url)}
          >
            Change on Facebook
          </button>
        </div>
      </div>
    );
  }
}

export default SummaryQuestion;
