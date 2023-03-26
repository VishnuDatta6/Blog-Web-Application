import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Data = {
    title : string; image_lnk : string; launchdate : string; id : number; author : string; description?: string 
}[]
const months ={ "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December" }

const Library = () => {
    const [data, setdata] = useState<Data>([])
    const url = "http://demo.api.admin.circlesnow.com/ProductRESTService.svc/getschedmsg"
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url, {
                headers: {
                    token: 'vishnudatta06@gmail.com'
                }
            });
            const json = await response.json();
            console.log(json)
            setdata(JSON.parse(json.dt));
        };
        fetchData();
    }, [])
    return (
        <>
            <div className="App container mt-5 hstack">
                <h1 className='header font-family' style={{ fontSize: '50px', fontWeight : "750" }}>Library</h1>
                <Link to="/newblog" className='ms-auto'>
                    <button type="button" className="btn px-5" style={{ backgroundColor: '#8CC928', color: 'white' }}>New blog</button>
                </Link>
            </div>
            <div className="container  text-start border rounded-top">
                <div className="row" style={{ backgroundColor: "#F3F3F3" }}>
                    <div className="col">
                        <strong>Cover image</strong>
                    </div>
                    <div className="col">
                        <strong>Launch date</strong>
                    </div>
                    <div className="col-6">
                        <strong>Title</strong>
                    </div>
                    <div className="col">
                        <strong>Author</strong>
                    </div>
                </div>
            </div>
            {data.map((item, index) => {
                const modalId = `exampleModal-${index}`;
                return (item.title &&
                    <div className="container-sm border" key={item.id}>
                        <div className="row" style={{padding: "10px 0" }}>
                            <div className="col">
                                <img src={item.image_lnk} style={{width:"24px"}} className="img-fluid" alt="Not found" onError={(e) => { console.log("Error loading image: ", e) }}></img>
                            </div>
                            <div className="col" style={{ color: '#979FA0', margin: "auto" }}>
                                {months[item.launchdate.slice(5, 7) as keyof typeof months]} {item.launchdate.slice(8, 10)}, {item.launchdate.slice(0, 4)}
                            </div>
                            <div className='col-6'>
                                <button type="button" className="btn text-start" style={{ color: "#009BE9" }} data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                                    {item.title}
                                </button>
                                <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}-label`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`${modalId}-label`}>Description</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col" style={{margin: "auto"}}>
                                {item.author}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Library