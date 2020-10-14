import React, {Component} from 'react';


class IllustrationTab extends Component {
  
    componentDidMount() {
        console.log("Illustration Tab Mounted!")
    }

    render() {
        return (
            <h3 className='text-center'>Tab illustration for {this.props.product.name}.</h3>
        )
    }
}

export default IllustrationTab;