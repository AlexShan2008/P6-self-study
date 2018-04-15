import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let AppComponent =  class extends Component {
    constructor (props) {
        super(props);
    }

    // 测试报错信息；
    componentDidMount () {
      vue = 'vanilla' + 'react'
    }

    render () {
        return (
            <div>
              react app
            </div>
        )
    }
};

ReactDOM.render(<AppComponent/>, document.querySelector('.react-area'));
