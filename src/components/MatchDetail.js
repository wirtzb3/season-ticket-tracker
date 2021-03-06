import _ from 'lodash';
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';
import RedeemMatch from './RedeemMatch';
import '../styles/MatchDetail.css';

export class MatchDetail extends Component {
  constructor(props) {
    super(props);

    this.ticketAvailable = this.ticketAvailable.bind(this);
    this.renderMatchDetails = this.renderMatchDetails.bind(this);
    this.matchBelongToUser = this.matchBelongToUser.bind(this);
    this.renderMatchAvailable = this.renderMatchAvailable.bind(this);
  }

  componentWillMount() {
    this.props.selectMatch(this.props.params.matchId);
  }

  componentWillUnmount() {
    this.props.selectMatch(null);
  }

  ticketAvailable(match) {
    return !match.claimedUser || match.available || match.qtyTicketsAvailable > 0;
  }

  matchBelongToUser(userId, match) {
    return match.claimedUser.uid === userId;
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  renderMatchAvailable(userId, match) {
    if (this.matchBelongToUser(userId, match)) {
      return (
        <h3 className='center-text match-detail-subtitle medium-grey-text'>
          You're going to this match!!
        </h3>
      );
    }

    return (
      <h3 className="animated fadeInUp center-text match-detail-subtitle medium-grey-text">
        Sorry, there are no tickets available for this match.
      </h3>
    );
  }

  renderMatchDetails(match) {
    return (
      <div>
        <div className='match-detail-item'>
          <h1 className='animated fadeInUp match-detail-title'>{ match.homeTeam.name } vs. { match.awayTeam.name }</h1>
          { this.ticketAvailable(match) ?
            <div className='animated fadeInUp center'>
              <h3 className='match-detail-subtitle medium-grey-text'>
                There is {match.qtyTicketsAvailable} ticket available for this match.
              </h3>
              {
                this.props.user
                ? <RedeemMatch user={this.props.user} matchId={this.props.params.matchId}/> // need to pass in other props
                : <h3 className="match-detail-subtitle medium-grey-text"> Log-in to claim this ticket for yourself! </h3>
              }

            </div>
          :
            <div className="animated fadeInUp center-button">
              {
                this.props.user
                ? this.renderMatchAvailable(this.props.user.uid, match)
                : this.renderMatchAvailable(null, match)
              }
            </div>
          }
      </div>
        <div className='animated fadeInUp match-detail-group'>
          <div className='match-detail-item'>
            <h4 className='match-detail-text medium-grey-text'>{ match.date } - { match.time }</h4>
            <h4 className='match-detail-text medium-grey-text'>{ match.location }</h4>
            <h4 className='match-detail-text medium-grey-text'>${ ( match.ticketPrice / 100 ).toFixed(2)} each</h4>
          </div>

          <div className='match-detail-item'>
            <img className='away-team-img' src={match.awayTeam.img} alt={match.awayTeam.name}/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div className='match-detail-container'>
        { match ? this.renderMatchDetails(match) : '' }
      </div>
    );
  }
}

MatchDetail.propTypes = {
  match: T.object,
  user: T.object,
  alert: T.bool,
  selectMatch: T.func.isRequired
}

const mapStateToProps = (state) => {
  const isLoggedIn = !(_.isEmpty(state.user));
  return {
    match: state.matches.data[state.matches.selectedMatch],
    user: isLoggedIn ? state.user.user : null,
    alert: state.alert.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMatch: (matchId) => {
      dispatch(selectMatch(matchId));
    }
  };
};

const MatchDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MatchDetail);
export default MatchDetailContainer;
