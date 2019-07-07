/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  Card, CardSection, Input, Button, Spinner,
} from 'generic-app-components'
import { emailChanged, passwordChanged, loginUser } from '../../actions'
import styles from './styles'

class LoginForm extends Component {
  onEmailChange = (text) => {
    this.props.emailChanged(text)
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text)
  }

  onButtonPress = () => {
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }

  renderError = () => {
    const { error } = this.props
    return error ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    ) : null
  }

  renderButton = () => {
    const { loading } = this.props
    return loading ? (
      <Spinner size="large" />
    ) : (
      <Button
        onPress={this.onButtonPress}
        text="Login"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
      />
    )
  }

  render() {
    const { email, password } = this.props
    return (
      <Card containerStyle={styles.container}>
        <View style={styles.insideWrapper}>
          <CardSection>
            <Input
              label="Email"
              onChangeText={this.onEmailChange}
              value={email}
              placeholder="email@test.com"
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Password"
              password
              placeholder="password"
              onChangeText={this.onPasswordChange}
              value={password}
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
            />
          </CardSection>
          {this.renderError()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </View>
      </Card>
    )
  }
}

LoginForm.propTypes = {
  emailChanged: PropTypes.func,
  passwordChanged: PropTypes.func,
  loginUser: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
}

LoginForm.defaultProps = {
  emailChanged: () => {},
  passwordChanged: () => {},
  loginUser: () => {},
  email: '',
  password: '',
  error: '',
  loading: false,
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  loading: state.auth.loading,
})

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
  }
)(LoginForm)
