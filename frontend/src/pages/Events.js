import React, {Component} from 'react' 
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'

class Events extends Component {

    state = {
        modalOpen: false
    }

  modalOpen = () => {
      this.setState({
        modalOpen: true
      })  }

      modalClose = () => {
        this.setState({
          modalOpen: false
        })
  };

  

    render () {
        return (
            <React.Fragment > 
{this.state.modalOpen ? ( 
              <React.Fragment >  
              <Backdrop />
             <Modal canCancel canConfirm closed={this.modalClose}> 
            </Modal> </React.Fragment>) : null}
      
        <div className='events'>
            <h1>Events </h1>
            <button onClick = {this.modalOpen}> Create Events</button>
        </div>
        </React.Fragment>
        )
    }
   
}

export default Events