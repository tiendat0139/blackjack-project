import Axios from 'axios';
import React, { Component } from 'react';
import '../css/Avatar.css';

const defaultAvatar = 'https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg';

export default class AvatarUpload extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFileImg: defaultAvatar,
            isUploaded: false,
        }
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeFileHandler = this.removeFileHandler.bind(this);
    }

    fileSelectedHandler = event => {
        const reader = new FileReader();
        this.setState({ isUploaded: true });
        reader.onload = () => {
            if (reader.readyState === 2){
                this.setState({selectedFileImg: reader.result}, () => {
                    this.props.handleSubmit(this.state);
                });
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    fileUploadHandler = () => {
        if (this.state.isUploaded){
            Axios.post('http://localhost:5000/avatar-upload', {
                image: this.state.selectedFileImg
            })
            .then((response) => console.log(response))
            .catch(err => console.log(err));
        }

        console.log(this.state.isUploaded);
    }

    removeFileHandler = () => {
        this.props.handleSubmit({
            selectedFileImg: null,
            isUploaded: false,
        });
    }

    render() {
        return (
            <div className="upload-wrapper">
                <input 
                    type="file"
                    style={{display: "none"}} 
                    onChange={this.fileSelectedHandler}
                    ref={fileInput => this.fileInput = fileInput}
                    name="image"
                    id="input"
                    accept='image/*' 
                />
                <img src={this.state.selectedFileImg} alt="" id="img" className='img'/>
                {!this.state.isUploaded && <button onClick={() => this.fileInput.click()} className="avatar-btn">写真選択</button>}
                {this.state.isUploaded && 
                (<div>
                    <button onClick={() => this.fileInput.click()} className="avatar-btn">写真編集</button>
                    <button onClick={() => {
                            this.setState({selectedFileImg: defaultAvatar, isUploaded: false});
                            this.fileInput.value = null;
                            this.removeFileHandler();
                        }} className="avatar-btn">削除</button>
                </div>)}
            </div>
        )
    }
}
