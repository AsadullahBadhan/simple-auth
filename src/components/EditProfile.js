import { updateProfile } from 'firebase/auth';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../App';

const EditProfile = () => {
  const nameRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();

  function handleUpdate(e) {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: nameRef.current.value,
      photoURL: imageRef.current.value
    })
      .then(() => {
        console.log('successfully updated profile');
        navigate('/dashboard')
      }
      )
      .catch(error => {
        console.log(error)
      })

  }
  return (
    <>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" ref={nameRef} />
        <br />
        <label htmlFor="Image">Profile Picture</label>
        <input type="text" name='image' ref={imageRef} />
        <br />
        <button type="submit">update</button>
      </form>
    </>
  );
};

export default EditProfile;