import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Newblog = () => {
    const [formvalue, setformvalue] = useState({ title: '', author: '', image_link: '', description: '' })
    const [ldate, setldate] = useState({ Month: '', dd: '', yyyy: '' })

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setformvalue({ ...formvalue, [name]: value });
        setldate({ ...ldate, [name]: e.target.value })
    }
    const handleSubmit = async () => {
        const AllInputs = { title: formvalue.title, launchdate: `${ldate.yyyy}-${ldate.Month}-${ldate.dd}`, author: formvalue.author, image_link: formvalue.image_link, description: formvalue.description }
        console.log(AllInputs);
        const url = "http://demo.api.admin.circlesnow.com/ProductRESTService.svc/schedMsg";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: "vishnudatta06@gmail.com",
                },
                body: JSON.stringify(AllInputs),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <h1 className='heading p-2 text-center' style={{ backgroundColor: 'green', color: 'white' }}>New Blog Page</h1>
            <div className='container border rounded mt-5 p-5 w-75' style={{ backgroundColor: "#F3F3F3" }}>
                <div className="mb-3">
                    <label htmlFor="FormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="FormControlInput1" name="title" placeholder="Enter title here" value={formvalue.title} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="FormControlInput2" className="form-label">Launch date</label>
                    <div className='hstack gap-3'>
                        <div className='col-xs-2'><input type="text" className="form-control" id="FormControlInput2" name='Month' placeholder="mm" value={ldate.Month} onChange={handleInput} /></div> /
                        <div className='col-xs-2'><input type="text" className="form-control" id="FormControlInput2" name='dd' placeholder="dd" value={ldate.dd} onChange={handleInput} /></div> /
                        <div className='col-xs-2'><input type="text" className="form-control" id="FormControlInput2" name='yyyy' placeholder="yyyy" value={ldate.yyyy} onChange={handleInput} /></div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="FormControlInput3" className="form-label">Author</label>
                    <input type="text" className="form-control" id="FormControlInput3" name="author" placeholder="Enter author name" value={formvalue.author} onChange={handleInput} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="FormControlInput4" className="form-label">Cover Image</label>
                    <input className="form-control" type="url" id="FormControlInput4" name="image_link" placeholder="Enter image URL" value={formvalue.image_link} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" name="description" placeholder="Enter description here" rows={3} value={formvalue.description} onChange={handleInput} />
                </div>
                <Link to="/">
                    <input className="btn px-5" type="submit" value="Submit" style={{ backgroundColor: '#8CC928', color: 'white' }} onClick={handleSubmit}></input>
                </Link>
            </div>
        </>
    )
}

export default Newblog;