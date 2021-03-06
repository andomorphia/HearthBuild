import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      battletag: '',
      password: '',
      passwordConfirm: '',
      errors: {}
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // If there is errors in the form display them
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  componentDidMount() {
    // If a user is already authenticated, send back to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      battletag,
      password,
      passwordConfirm,
    } = this.state;

    const newUser = {
      name,
      email,
      battletag,
      password,
      passwordConfirm,
    };

    // Send data from the form to axios
    this.props.actions.registerUser(newUser, this.props.history);
  }

  render() {
    const {
      name,
      email,
      battletag,
      password,
      passwordConfirm,
      errors
    } = this.state;

    return (
      <main>
        <section className="section" id="login">
          <div className="container">
            <div className="box">
              <form noValidate className="form" onSubmit={this.onSubmit}>
                <h1 className="title">Register</h1>
                <TextFieldGroup
                  name="name"
                  label="Username"
                  icon="fas fa-user"
                  value={name}
                  error={errors.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  label="Email address"
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  icon="fas fa-envelope"
                  value={email}
                  error={errors.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="battletag"
                  label="Battletag"
                  info="If you want other players to find you in game, fill in your B.NET battletag here"
                  icon="fas fa-gamepad"
                  value={battletag}
                  error={errors.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  label="Password"
                  icon="fas fa-lock"
                  value={password}
                  error={errors.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                  icon="fas fa-check"
                  value={passwordConfirm}
                  error={errors.passwordConfirm}
                  onChange={this.onChange}
                />
                <p>Already registered ? Please  <Link to="/login" className="has-text-primary">login</Link>.</p>
                <div className="field">
                  <input type="submit" value="Submit" className="button is-primary is-outlined is-medium" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
}

export default Register;
