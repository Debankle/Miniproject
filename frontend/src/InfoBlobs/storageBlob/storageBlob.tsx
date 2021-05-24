import { Component } from 'react';
import './storageBlob.css';

class StorageBlob extends Component<{}, {}> {


    getStorageInfo() {
        const requestOptions = {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: {
                authorization: localStorage.getItem('login_token') || ''
            }
        }
        fetch('/api/storage', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                var returnArr = res.data.split('\n');
                var tableDomData = '<table><tr><th>Filesystem</th><th>1K-blocks</th><th>Used</th><th>Available</th><th>Use%</th><th>Mounted On</th></tr>';
                for (var i = 1; i < returnArr.length - 1; i++) {
                    var dataArr = returnArr[i].split(' ');
                    var rowDOMData = '<tr>';
                    for (var j = 0; j < dataArr.length; j++) {
                        if (dataArr[j] !== '') {
                            rowDOMData += '<td>' + dataArr[j] + '</td>';
                        }
                    }
                    tableDomData += rowDOMData + '</tr>';
                }
                tableDomData += '</table>';

                (document.getElementById('tableSpot') as HTMLElement).innerHTML = tableDomData;
            }
        });
    }

    componentDidMount() {
        this.getStorageInfo();
        setInterval(() => {
            this.getStorageInfo();
        }, 60 * 1000);
    }

    render() {

        return (
            <div className="storage-blob">
                <h4>Storage</h4>
                <div id="tableSpot"></div>
            </div>
        );
    }
}

export default StorageBlob;
