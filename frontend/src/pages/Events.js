import React, {Component} from 'react' 
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from '../context/auth-context'
import EventsList from '../components/Events/EventsList/EventList'
import Spinner from '../components/Spinner/Spinner'

class Events extends Component {

    state = {
        modalOpen: false,
        events: [],
        isLoading: false, 
        showedDetails: null
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
          modalOpen: false,
          showedDetails: null
        })
  };

  showDetails = (eventId ) => {
    console.log(this.state.showedDetails)
    this.setState(prevState => {
      const showedDetails = prevState.events.find(e => e._id === eventId)
      return {showedDetails: showedDetails}
    })
  }
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
    this.setState(prevState => {
     const updatedEvents = [...prevState.events]
     console.log(resData)
     updatedEvents.push({
       _id: resData.data.createEvent._id,
       title: resData.data.createEvent.title,
       description: resData.data.createEvent.description,
       date: resData.data.createEvent.date,
       price: resData.data.createEvent.price,
       creator: {
         _id: this.context.userId
       }
     });
     return {events: updatedEvents}
    })
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchEvents = () => {

    this.setState({
      isLoading: true
    })

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
    console.log(resData)
    this.setState({
      events,
      isLoading:false
    })
      })
      .catch(err => {
        console.log(err);
       this.setState({
        isLoading:false
       })
      });
  };

  

  

    render () {

     
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
            {this.state.showedDetails ?   
            <Modal 
                title={this.state.showedDetails.title}
                canCancel 
                canConfirm 
                closed={this.modalClose} 
                onConfirm={this.modalConfirmeHandler}> 
            <h1>{this.state.showedDetails.title}</h1>
            <p>{this.state.showedDetails.description}</p>
            </Modal> : null}
      {this.context.token ?  <div className='events'>
            <h1>Events </h1>
            <button onClick = {this.modalOpen}> Create Events</button>
        </div> : null }

       {this.state.isLoading ? 
         <Spinner />
        : <EventsList
         events={this.state.events}
         userId= {this.context.userId}
         showDetails={this.showDetails}/> }

        </React.Fragment>
        )
    }
   
}

export default Events