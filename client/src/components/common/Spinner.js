import React from 'react';
import { css } from 'react-emotion';
import { FadeLoader } from 'react-spinners';

const override = css`
    margin: auto; position: absolute; top: 0; left: 0;z-index: 1001;
`;

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='em-spinner'>
                <FadeLoader
                    className={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#888da8'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}