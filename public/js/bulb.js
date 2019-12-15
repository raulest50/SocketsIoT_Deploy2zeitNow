'use strict';

const e = React.createElement;

class Bulb extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

//encontrar el id
const domContainer = document.querySelector('#Bulb');
// renderizar el componente
ReactDOM.render(e(Bulb), domContainer);