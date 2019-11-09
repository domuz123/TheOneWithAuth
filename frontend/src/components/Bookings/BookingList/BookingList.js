import React from 'react'
import './BookingList.css'

const bookingList = (props) => (
    <ul> 
        {props.bookings.map(booking => {
            return( 
             
                <li className='list_bookings' key={booking._id}> 

                <div className='list_items'> 
                { booking.event.title} - {new Date (booking.createdAt).toLocaleDateString()} 
                </div> 
                <div> 
                    <button className='btn' onClick={props.handleBokingDelete.bind(this, booking._id)}> Cancel Booking</button>
                </div>
                </li> 
           )
        })}
    </ul>
)

export default bookingList