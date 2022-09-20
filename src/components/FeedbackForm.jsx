import { useState } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'



function FeedbackForm({ handleAdd }) {
    const [text, setText] = useState ('') // input text
    const [rating, setRating] = useState (10) // input Rating
    const [btnDisabled, setBtnDisabled] = useState (true) // Send Button
    const [message, setMessage] = useState ('') // alert message 

    const handleTextChange =(e) => {
        // if the text = nothing and set button disabled
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
            // text isNot = nothing & less than 10 characters show message
        }else if( text !== '' && text.trim().length <= 10){
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        }else{
            // text greater than 10 characters - button is enabled
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }
    const handleSubmit = (e) =>{

        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating,
            }
           handleAdd(newFeedback)

           setText('')
        }
    }

  return (
    <Card>
        <form onSubmit ={handleSubmit}>
            <h2> How Do you rate your service with us?</h2>
            <RatingSelect select ={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input 
                    onChange={handleTextChange}
                    type="text" placeholder='Write a review'
                    value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>

            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm