
import React, { Component } from 'react';

class RenderTable extends Component{
    
    constructor(props){
        super(props);
        // this.onClick = this.onClick.bind(this);

        this.state = {
            rows:  [
                { no:1, name: '', contentType: '', size: '', downloadURLs:'' },
              ],
            filesMetadata:[{}],
        }

        this.test()
       
        this.test2();
    }

    test(){
        const databaseRef = this.props.db.database().ref('/filepond');

        databaseRef.on('value', snapshot => {
            this.setState({
                filesMetadata:snapshot.val()
            });

            console.log(this.state.filesMetadata);
        });

    }

    test2() {
        console.log("test2");
        for (var key in this.state.filesMetadata) {
            console.log(this.state.filesMetadata[key]);

            // var fileData = this.state.filesMetadata[key];
            // var rows = this.state.rows;

            // var objRows =  { 
            //     no:1, 
            //     name: fileData.name, 
            //     downloadURLs: fileData.downloadURLs, 
            //     fullPath: fileData.fullPath,
            //     size:fileData.size,
            //     contentType:fileData.contentType,
            // }

            // rows.push(objRows)

            // this.setState({
            //     rows: rows
            // })

            // console.log(rows);
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
                    <td>{r.downloadURLs}</td>
                </tr>
            )
        });
        return (
            <div className="is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <table border="1">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>File Name</th>
                            <th>File Type</th>
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