import React from 'react';
import { css } from 'react-emotion';
import { FadeLoader } from 'react-spinners';

const override = css`{
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
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
                            color={'#545566'}
                            loading={this.state.loading}
                        />
                    </div>
                )}
                {!this.state.loading && null}
            </React.Fragment>
        )
    }
}