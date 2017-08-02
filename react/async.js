import React from 'react'

class Async extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      component: props.loader || (() => <div>loading...</div>)
    }
  }
  componentWillMount () {
    this.props.component
      .then(res => this.setState({ component: res }))
      .catch(err => console.error(err))
  }
  render () {
    const Component = this.state.component
    return <Component {...this.props.props} />
  }
}

export default Async

/*
<Async component={import('react-markdown')} props={{source: content}} />
*/