import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa';
import { API } from '../config';

const Category = () => {
    const[category,setCategory]=useState([])
    useEffect(()=>{
        axios.get(`${API}/categorylist`)
        .then(res=>{
          console.log(res.json)

        })
        .then(data=>setCategory(data))
        .catch(err=>console.log(err))
    })
    return (
    <>
            <div class='container'>
                <div class="row d-flex justify-content-center">
                    <div class="col-md-5 shadow">
                        <table class="table">
                            <thead>
                                    <tr>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {category && category.map((c,i)=>(
                                <tr key={i}>
                                    <td>{c.category_name}</td>
                                    <td><button className='btn btn-danger'><FaTrash/></button></td>
                                </tr>
                                  ))}
                                </tbody>
                                </table>
                            </div>
                    </div>
                </div>

            </>
            )
}

            export default Category