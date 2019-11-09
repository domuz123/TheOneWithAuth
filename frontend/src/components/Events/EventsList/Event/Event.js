import React from 'react'
import './Event.css'

const event = (props) => 
       ( 
 <li key={props.eventId} className='events_list_item'>
     <div>  
         <h1>   
         {props.eventTitle} 
         </h1>
         <h2> {props.eventPrice}$ - {new Date(props.eventDate).toLocaleDateString()}</h2>
     
      </div>
      <div>
          {props.userId === props.creatorId?  <p> This is your event</p> : <button className='btn' onClick={props.showDetails.bind(this, props.eventId)}> View details </button> }
          
       
      </div>
      </li>
       );

export default event