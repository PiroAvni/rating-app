import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState(""); // input text
  const [rating, setRating] = useState(10); // input Rating
  const [btnDisabled, setBtnDisabled] = useState(true); // Send Button
  const [message, setMessage] = useState(""); // alert message

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

//   const handleTextChange = (e) => {
//     // if the text = nothing and set button disabled
//     if (text === "") {
//       setBtnDisabled(true);
//       setMessage(null);
//       // text isNot = nothing & less than 10 characters show message
//     } else if (text !== "" && text.trim().length <= 10) {
//       setMessage("Text must be at least 10 characters");
//       setBtnDisabled(true);
//     } else {
//       // text greater than 10 characters - button is enabled
//       setMessage(null);
//       setBtnDisabled(false);
//     }
//     setText(e.target.value);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim().length > 10) {
//       const newFeedback = {
//         text,
//         rating,
//       }

//       if (feedbackEdit.edit === true) {
//         updateFeedback(feedbackEdit.item.id, newFeedback);
//       } else {
//         addFeedback(newFeedback);
//       }

//       setText("");
//     }
//   };
// NOTE: This should be checking input value not state as state won't be the updated value until the next render of the component

  // prettier-ignore
  const handleTextChange = ({ target: { value } }) => { // 👈  get the value
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
      
  // prettier-ignore
    } else if (value.trim().length < 10) { // 👈 check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      // NOTE: reset to default state after submission
      setBtnDisabled(true) // 👈  add this line to reset disabled
      setRating(10) //👈 add this line to set rating back to 10
      setText('')
    }
  }

  // NOTE: pass selected to RatingSelect so we don't need local duplicate state
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2> How Do you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
