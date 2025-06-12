import { useState } from "react";





function AccountRegister() {
    const [form, setForm] = useState({
        email: '',
        nickname: '',
        age: '',
        gender: '',
        icon: null
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const res = await fetch ("http://127.0.0.1:5000/register", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
          });
          const data = await res.json();
          alert('response from server :' + data.message);
        } catch (err){
          console.log(err);
          alert('communication error :' + err.message);
        }
     };
    return (
        <div>
            <h2>アカウント登録</h2>
            <form onSubmit = {handleSubmit}>
            <input 
              type = "email" 
              placeholder = 'Mail Address'
              value = {form.email}
              onChange = {e => setForm({ ...form, email: e.target.value})}
            />
            <input 
              type = 'text' 
              placeholder = 'Nick Name'
              value = {form.nickname}
              onChange = {e => setForm({ ...form, nickname: e.target.value})}
            />
            <input 
              type = 'number' 
              placeholder = 'Age'
              value = {form.age}
              onChange = {e => setForm({ ...form, age: e.target.value})} />
            <select
              value = {form.gender}
              onChange = {e => setForm({ ...form, gender: e.target.value})}
            >
                <option value = ''>Select Gender</option>
                <option value = 'male'>Male</option>
                <option value = 'female'>Female</option>
                <option value = 'other'>Other</option>
            </select>
            <input 
              type = 'file' 
              accept = 'image/*'
              onChange = {e => setForm({ ...form, icon: e.target.files[0]})}
            />

            <button type = 'submit'>Register</button>
            </form>

            {/* ここにフォームをあとで作っていく　*/}
        </div>
    );
}


export default AccountRegister;