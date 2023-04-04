import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
  children: ReactNode;
  name: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    name: 'Error Boundary'
  };

  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({error, errorInfo});
  }

  render() {
    if (this.state.hasError) {
      // Error UI rendering
      return (
        <div>
          <h2>{this.props.name} - Something went wrong</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state?.error?.toString()}
            <br />
            {this.state?.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // Normal UI rendering
    return this.props.children;
  }
}

export default ErrorBoundary;
