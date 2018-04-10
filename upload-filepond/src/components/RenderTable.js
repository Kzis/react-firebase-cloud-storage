import React, { Component } from 'react';

class RenderTable extends Component{
    
    constructor(props){
        super(props);
        // this.onClick = this.onClick.bind(this);

        this.state = {
            rows:  [
                {},
              ],
            filesMetadata:[{}],
        }

        this.getMetaDataFromDatabase()
            .then(() => {

                console.log("Promise");
                return this.addMetadataToList();
            });
    }

    getMetaDataFromDatabase () {
        return new Promise((resolve, reject) => {
            const databaseRef = this.props.db.database().ref('/filepond');

            databaseRef.on('value', snapshot => {
                this.setState({
                    filesMetadata:snapshot.val()
                }, () => {
                    resolve();
                });
                // console.log(this.state.filesMetadata);
            });
        });
    }

    addMetadataToList() {
        console.log("addMetadataToList");
        console.log("============");
        let i = 1;
        for (let key in this.state.filesMetadata) {
            
            // console.log(i++,this.state.filesMetadata[key]);

            let fileData = this.state.filesMetadata[key];
            let rows = this.state.rows;

            console.log("fileData");
            console.log(i,fileData);
            console.log("addDataToObject");

            let objRows =  { 
                no:i++, 
                name: fileData.metadataFile.name, 
                downloadURLs: fileData.metadataFile.downloadURLs, 
                fullPath: fileData.metadataFile.fullPath,
                size:fileData.metadataFile.size,
                contentType:fileData.metadataFile.contentType,
            }

            console.log(objRows);

            rows.push(objRows)

            this.setState({
                rows: rows
            })

            // console.log(rows);

            console.log("============");
        }

    }
  
    // onClick(e) {
    //     e.preventDefault();
    //     var rows = this.state.rows;

    //     var objRows =  { no:rows[rows.length-1].no + 1, name: 'New add', age: 99, color: 'red' }


    //     console.log(rows)
    //     console.log(objRows)
       
    //     rows.push(objRows)
        
    //     console.log(rows)

    //     this.setState({
    //         rows: rows
    //     })
    // }

    render() {
        let messageNodes = this.state.rows.map((r) => {
            return (
                <tr>
                    <td>{r.no}</td>
                    <td>{r.name}</td>
                    <td>{r.contentType}</td>
                    <td>{r.size}</td>
                    <td><a target="_blank" href={r.downloadURLs}>Download</a></td>
                </tr>
            )
        });
        return (
            <div>
                <table border="1" className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>File Name</th>
                            <th>File Type</th>
                            <th>File Size</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messageNodes}
                    </tbody>
                </table>
              {/* <button id="addBtn" onClick={this.onClick}>ADD</button> */}
            </div>
          );
    }
}

export default RenderTable;
