import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(_, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (error) {
      return (
        <div role="alert" style={{ background: 'rgba(255, 0, 0, 0.2)', padding: 15 }}>
          There was an error:
          <pre style={{ whiteSpace: 'normal', color: '#ff0000' }}>{error.message}</pre>
          {errorInfo && <pre>{errorInfo.componentStack.toString()}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}
