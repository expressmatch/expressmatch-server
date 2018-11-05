import React from 'react';
import { css } from 'react-emotion';
import { FadeLoader } from 'react-spinners';

const override = css`{
    position: absolute;
    left: 50%;
    top: 50%; 
    margin: 0 auto;
    z-index: 1101;
}`;

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({
            loading: newProps.loading
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.state.loading && (
                    <div className='em-spinner'>
                        <FadeLoader
                            className={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#888da8'}
                            loading={this.state.loading}
                        />
                    </div>
                )}
                {!this.state.loading && null}
            </React.Fragment>
        )
    }
}