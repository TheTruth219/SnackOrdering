import React,{Component} from 'react';
import "./assets/styles/styles.css";
import SnackVoting from './components/SnackVoting';
import checkRequests from './components/macro/errorHandling';
import CurrentSnacks from './components/CurrentSnacks';
import Loader from './components/micro/loader';



class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:"true"
    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({loading:"false"})
    },1000)
  }

  render(){
    return (
      <div className="App">
       <CurrentSnacks/>
       <SnackVoting/>
       <Loader loading={this.state.loading} src="https://8bitjohn.com/wp-content/uploads/2019/09/maintenance.gif">
                                <h1 style={{marginTop:`2em`,fontSize:`40px`,alignSelf:`center`,position:`absolute`,top:`70vh`}}>Loading.....</h1>
                                </Loader>
      </div>
    );
  }
 
}

export default checkRequests (App);
