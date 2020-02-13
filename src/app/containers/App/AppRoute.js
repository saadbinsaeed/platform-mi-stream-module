/* @flow */

/**
 * AppRoute component called when AppRoute is bootstrapped
 */

// $FlowFixMe
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GlobalTemplate from 'app/components/templates/GlobalTemplate';
import EventsRoute from 'app/containers/Stream/Events/EventsRoute';

import Loader from 'app/components/atoms/Loader/Loader';
import { loadUserPreferences, loadUserProfile } from 'store/actions/admin/usersActions';

// Load main parts of the Application
// import DevTestRoute from 'app/devtest/DevTestRoute'

/**
 * AppRoute Container
 */
class AppRoute extends PureComponent<Object, Object> {
    static propTypes = {
        profile: PropTypes.object,
        loadingProfile: PropTypes.bool.isRequired,
        loadUserProfile: PropTypes.func.isRequired,
        preferences: PropTypes.object,
        loadingPreferences: PropTypes.bool.isRequired,
        loadUserPreferences: PropTypes.func.isRequired
    };

    timer;
    previousRequestTime: Object;
    state = { key: 1 };

    /**
     * @override
     */
    componentWillMount() {
        if (!this.props.preferences && !this.props.loadingPreferences) {
            this.props.loadUserPreferences();
        }
        if (!this.props.profile && !this.props.loadingProfile) {
            this.props.loadUserProfile();
        }
    }

    /**
     * @override
     */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    reloadFullPage = () => this.setState({ key: this.state.key + 1 });

    /**
     * @override
     */
    render(): Object {
        const { profile, preferences } = this.props;
        if (!profile || !preferences) {
            return <Loader absolute />;
        }

        // const DevToolsSwitch: Object = this.DevToolsSwitch;
        // eslint-disable-next-line no-restricted-globals
        return (
            <GlobalTemplate key={this.state.key}>
                <Switch>
                    <Route path="/" component={EventsRoute} />
                </Switch>
            </GlobalTemplate>
        );
    }
}

export default connect(
    state => ({
        loadingPreferences: state.user.loadingPreferences,
        preferences: state.user.preferences,
        loadingProfile: state.user.loadingProfile,
        profile: state.user.profile
    }),
    {
        loadUserPreferences,
        loadUserProfile
    }
)(AppRoute);
