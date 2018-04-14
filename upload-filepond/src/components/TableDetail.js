import React, { Component } from 'react';

class RenderTable extends Component{
    
    constructor(props){
        super(props);
        // this.onClick = this.onClick.bind(this);
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

export default RenderTable;
