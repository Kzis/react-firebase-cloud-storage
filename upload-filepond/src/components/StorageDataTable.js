import React, { Component } from 'react';

class StorageDataTable extends Component{
    
    constructor(props){
        super(props);
    }

    render() {
        let messageNodes = this.props.rows.map((r) => {
            return (
                <tr key={r.no + r.name}>
                    <td>{r.no}</td>
                    <td>{r.name}</td>
                    <td>{r.contentType}</td>
                    <td>{r.size} Mb</td>
                    <td><a target="_blank" href={r.downloadURLs}>Download</a></td>
                    <td><a target="_blank" onClick={(e) => this.props.deleteData(e,r)}>Delete</a></td>
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
                            <th>Download</th>
                            <th>Delete</th>
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

export default StorageDataTable;
