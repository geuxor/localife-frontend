import React from 'react'

export default function LogIn() {
  return (
    <form onSumbit={submitHandler}>
      <div className="form-inner">
        <h2>LOGIN</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <label className="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-group">
          <label className="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
    </form>
  )
}
