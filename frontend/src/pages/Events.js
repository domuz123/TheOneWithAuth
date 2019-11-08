import React, {Component} from 'react' 
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from '../context/auth-context'

class Events extends Component {

    state = {
        modalOpen: false,
        events: []
    }

    static contextType = AuthContext

    constructor(props){
      super();
      this.titleRef = React.createRef()
      this.priceRef = React.createRef()
      this.dateRef = React.createRef()
      this.descriptionRef = React.createRef()
    }

    componentDidMount() {
      this.fetchEvents()
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

  modalConfirmeHandler = () => {
    this.setState({
      modalOpen: false
    })

    let title = this.titleRef.current.value
    let price = +this.priceRef.current.value
    let description = this.descriptionRef.current.value
    let date = this.dateRef.current.value
      if(title.trim().length === 0 || description.trim().length === 0
        || date.trim().length  === 0 || price <= 0)  {
          console.log('error')
        }
    const event = {title, price, description, date}
    
    console.log(event)

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
     this.fetchEvents()
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchEvents = () => {

    const requestBody = {
      query: `
          query {
            events  {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };


    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
       
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
    const events = resData.data.events
    this.setState({
      events
    })
      })
      .catch(err => {
        console.log(err);
      });
  };

  

  

    render () {

      const listOfEvenets = this.state.events.map(event => {
        return  <li key={event._id} className='events_list_item'> {event.title} </li>
      })
        return (
            <React.Fragment > 
            {this.state.modalOpen ? ( 
              <React.Fragment >  
              <Backdrop />
             <Modal canCancel canConfirm closed={this.modalClose} onConfirm={this.modalConfirmeHandler}> 
             <form>
                <div className='form-control'>
                  <label htmlFor ='title' > Title</label> 
                  <input type='text' id='title' ref={this.titleRef}/>  
                  </div>
                </form> 
                <form>
                <div className='form-control'>
                  <label htmlFor ='price' > Price</label>
                  <input type='number' id='price' ref={this.priceRef}/>   </div>
                </form> 
                <form>
                <div className='form-control'>
                  <label htmlFor ='date' > Date</label>
                  <input type='datetime-local' id='date' ref={this.dateRef}/>   </div>
                </form> 

                <form>
                <div className='form-control'>
                  <label htmlFor ='description' > Description</label>
                  <textarea id='description' rows='4' ref={this.descriptionRef}/>   </div>
                </form> 
            </Modal> </React.Fragment>) : null}
      {this.context.token ?  <div className='events'>
            <h1>Events </h1>
            <button onClick = {this.modalOpen}> Create Events</button>
        </div> : null }

        <ul className='events_list'> 
         {listOfEvenets} 
          </ul> 
       
        </React.Fragment>
        )
    }
   
}

export default Events