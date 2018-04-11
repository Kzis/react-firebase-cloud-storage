
import './App.css';

import React, { Component } from 'react';
import { FilePond, File, registerPlugin } from 'react-filepond';
import firebase from 'firebase';

import TableDetail from './components/TableDetail';

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
            filesMetadata:[],
            rows:  [],
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

    componentWillMount() {
        this.getMetaDataFromDatabase()
    }

    getMetaDataFromDatabase () {
        const databaseRef = firebase.database().ref('/filepond');

        databaseRef.on('value', snapshot => {
            this.setState({
                filesMetadata:snapshot.val()
            }, () => this.addMetadataToList());
        });
    }

    addMetadataToList() {
        // console.log("addMetadataToList");
        // console.log("============");
        let i = 1;
        let rows = [];
        for (let key in this.state.filesMetadata) {
            
            // console.log(i++,this.state.filesMetadata[key]);

            let fileData = this.state.filesMetadata[key];
            // let rows = this.state.rows;

            // console.log("fileData");
            // console.log(i,fileData);
            // console.log("addDataToObject");

            let objRows =  { 
                no:i++, 
                name: fileData.metadataFile.name, 
                downloadURLs: fileData.metadataFile.downloadURLs, 
                fullPath: fileData.metadataFile.fullPath,
                size:(fileData.metadataFile.size),
                contentType:fileData.metadataFile.contentType,
            }

            // console.log(objRows);

            rows.push(objRows)

            this.setState({
                rows: rows
            }, () => {
                console.log('set rows')
            })

            // console.log("============");
        }

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
            //Success
            this.setState({
                messag:`Upload Success`,
                picture: task.snapshot.downloadURL
            })

            storageRef.getMetadata().then(function(metadata) {
                // Metadata now contains the metadata for 'filepond/${file.name}'
                let metadataFile = { 
                    name: metadata.name, 
                    size: metadata.size, 
                    contentType: metadata.contentType, 
                    fullPath: metadata.fullPath, 
                    downloadURLs: metadata.downloadURLs[0], 
                }

                const databaseRef = firebase.database().ref('/filepond');

                databaseRef.push({
                    metadataFile
                  });

              }).catch(function(error) {
                this.setState({
                    messag:`Upload error : ${error.messag}`
                })
              });
        })
    }

    render() {
        const { rows, filesMetadata } = this.state;
        return (
            <div className="App">
                <div className="Margin-25">
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

                    <TableDetail
                        rows={rows}
                        filesMetadata={filesMetadata}
                    />
                </div>
            </div>
        );
    }
}

export default App;