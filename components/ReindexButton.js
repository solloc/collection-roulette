import React from "react";
import { BeatLoader } from "react-spinners";

export default class ReindexButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loading: false, data: "" }
    }

    render() {
        const { loading, data } = this.state;
        return (
            <div>
                <button onClick={() => {
                    console.log('do someting');
                    this.setState({ loading: true });
                    // this.state.loading = true;
                    fetch('/api/reindex')
                        .then((data) => this.setState({loading: false}));
                }}>
                    reindex
                </button>
                 <p>{ loading ? <BeatLoader/> : '' }</p>
            </div>

        )
    }
}