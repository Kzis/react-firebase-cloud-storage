import React, { Component } from 'react';
import { FilePond, File, registerPlugin } from 'react-filepond';
import firebase from 'firebase';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Register plugin
import FilePondImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondImagePreview);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            uploadValue: 0,
        };

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDdjNteSHXKMvPbUoKMhXVGVGcnxh1QplI",
        authDomain: "react-upload.firebaseapp.com",
        databaseURL: "https://react-upload.firebaseio.com",
        projectId: "react-upload",
        storageBucket: "react-upload.appspot.com",
        messagingSenderId: "704952803467"
    };
    firebase.initializeApp(config);

    }
    
    handleInit() {
        console.log('now initialised', this.pond);
    }

    handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
        // handle file upload here
        console.log(" handle file upload here");
        console.log(file);

        const fileUpload = file;
        const storageRef = firebase.storage().ref(`filepond/${file.name}`);
        const task = storageRef.put(fileUpload)

        task.on(`state_changed` , (snapshort) => {
            console.log(snapshort.bytesTransferred, snapshort.totalBytes)
            let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            this.setState({
                uploadValue:percentage
            })
        } , (error) => {
            this.setState({
                messag:`Upload error : ${error.messag}`
            })
        } , () => {
            console.log(task.snapshot.downloadURL)
            this.setState({
                messag:`Upload Success`,
                picture: task.snapshot.downloadURL
            })
        })
    }

    render() {
        return (
            <div className="App">
                <FilePond allowMultiple={true}
                          maxFiles={3}
                          ref= {ref => this.pond = ref}
                          server={{ process: this.handleProcessing.bind(this) }}
                          oninit={() => this.handleInit()}>
                    
                  <File/>
                    {this.state.files.map(file => (
                        <File key={file} source={file} />
                    ))}
                    
                </FilePond>
            </div>
        );
    }
}

export default App;