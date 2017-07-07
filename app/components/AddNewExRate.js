import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return { show: false };
    },

    render() {
        let close = () => this.setState({ show: false});

        return (
            <div className="modal-container" style={{height: 200}}>
                <Button
                    bsStyle="default"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                >
                    Add New Exchange Rate
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

