import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search';
export const SearchInp=() =>{
    const [values,setValues]=useSearch()
    const navigate=useNavigate()
    function handleSearch(e)
    {
        e.preventDefault()
        fetch(`http://localhost:2443/product/search-product/${values.keyword}`).then((res1)=>{
            res1.json().then((res2)=>{
                console.log(res2)
                setValues({...values,result:res2})
                navigate('/search')
            })
        })
    }
  return (
    <div>
<Form inline onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 bg-white ms-5 ps-5"
              value={values.keyword}
              onChange={(e)=>setValues({...values,keyword:e.target.value})}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant='secondary' className='ms-5'>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}


