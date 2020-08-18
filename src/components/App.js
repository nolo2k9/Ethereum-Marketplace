import React, { Component } from 'react'
import Web3 from 'web3'
import logo from '../logo.png'
import './App.css'
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'

class App extends Component {
  componentDidMount() {
    document.title = 'Blockchain Marketplace'
  }
  //runs when load web3 is created
  async componentWillMount() {
    await this.loadWeb3()
    //load
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      //connect to blockchain
      window.web3 = new Web3(window.ethereum)
      //enable
      await window.ethereum.enable()
    }
    //legacy broswer
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    //if neither exist
    else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }
  //load accounts from blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    //load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //logging abi and network address
    const networkid = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkid]
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address,
      )
      console.log(networkid)
      console.log(marketplace)
    } else {
      window.alert('Marketplace contract not deployed to a dedicated networka')
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
    }
  }

  render() {
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1></h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
