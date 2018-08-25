import React, { Component } from 'react'
import DocHashStorageContract from '../build/contracts/DocHashStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      ipfsHash: null,
      web3: null,
      buffer: null,
      account: null,
      ethAddress: null,
      docnum : null,
      username: null,
      transactlist : null,
      taginfo: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const DocHashStorage = contract(DocHashStorageContract)
    DocHashStorage.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      DocHashStorage.deployed().then((instance) => {
        this.DocHashStorageInstance = instance
        this.setState({ account: accounts[0] })

        // Get the value from the contract to prove it worked.
//      return this.DocHashStorageInstance.get.call(accounts[0])
//      }).then((ipfsHash) => {
        // Update state with the result.
    //    return this.setState({ ipfsHash })
      })
    })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onInputChangeTag(event) {
    this.setState({ taginfo: event.target.value })
  }

  onSubmitName(event) {


  }


  onSubmit(event) {
    var newIPFShash

    event.preventDefault()
    this.setState({ethAddress: "Please Wait.."});

    ipfs.files.add(this.state.buffer, (error, result) => {
        if(error) {
          console.error(error)
          return
        }

    newIPFShash = result[0].hash;

    this.setState({ethAddress: this.DocHashStorageInstance.address });

    this.DocHashStorageInstance.adddocs(newIPFShash, this.state.taginfo, {from: this.state.account, gas: 1000000} ).then((r) => {
    return this.setState({ipfsHash: newIPFShash})
      })
    })
  }

  activateTransactions() {
    event.preventDefault()
    this.setState({docnum: this.DocHashStorageInstance.getnumdocs()});
    this.setState({ethAddress: this.DocHashStorageInstance.address});
   };

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Document Timestamp / IPFS</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>User Profile</h2>
              <p>User Ethereum Address: {this.state.account}</p>
              <p>User ID: {this.state.userinfo} </p>
              <form onSubmit={this.onSubmitName} >
                <input id="nameinfo" type="text" value={this.state.username} placeholder="enter new username" />
                <input type='submit' />
              </form>
              <br/>
              <h2>Upload Document/Image</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input id="taginfo" type="text" value={this.state.taginfo} onChange={this.onInputChangeTag.bind(this)} placeholder="enter tag" />
                <input type='submit' />
              </form>
              <h2>Latest Transaction Info</h2>
              <p>IPFS Hash #: {this.state.ipfsHash}</p>
              <p>Ethereum Contract Address: {this.state.ethAddress}</p>
              <p><img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/></p>
              <hr/>
              <br/>

              <button onClick={ this.activateTransactions.bind(this) }> Load Transactions </button>
              <p>Number of documents: {this.state.docnum}</p>
              <p>Data</p>
              {this.state.transactlist}


            </div>
          </div>



        </main>
      </div>
    );
  }
}

export default App
