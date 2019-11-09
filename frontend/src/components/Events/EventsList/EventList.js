import React from 'react'
import './EventList.css'
import Event from '../EventsList/Event/Event'

const eventList = (props) => 

{
    const events = props.events.map(event=> {
        return <Event  key={event._id} 
                       eventId={event._id}  
                       eventTitle={event.title} 
                       eventPrice={event.price}
                       eventDate={event.date}
                       userId={props.userId}
                       creatorId={event.creator._id}
                       showDetails={props.showDetails}/>
    })
    
    return (
    <ul className='event_list'> 
    {events} 
     </ul> 
) 

}

export default eventList