import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function PostForm(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3ODMzODU1OCwiZXhwIjoxNjc4MzQ5MzU4fQ.WDrR_ZWVMCVzoueJwFprrpPg12YTfnmtrIuVMmsuZmI";
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function registerPost(event) {
        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const URL = 'http://localhost:5000/posts';
        const promise = axios.post(URL, postData, config);

        promise.then(() => {
            setIsSubmitting(false);
            setPostData({ externalLink: "", description: "" });
        })

        promise.catch(() => {
            alert("There was an error publishing your link.");
            setIsSubmitting(false);
        })
    }

    const [postData, setPostData] = useState({
        externalLink: "",
        description: ""
    });

    const {externalLink, description} = postData; 

    function handleForm(e) {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        })
    }
    return(
        <PostFormContainer>
            <FormContent>
                <CustomerData>
                    <img src="https://static.wikia.nocookie.net/meme/images/7/72/Irineu.png/revision/latest?cb=20170223020835&path-prefix=pt-br"/>
                    <p>What are you going to share today?</p>
                </CustomerData>
                <form onSubmit={registerPost} data-test="publish-box">
                    <input
                        className="link-input"
                        type="url"
                        id='url'
                        placeholder=' http://...'
                        required
                        name='externalLink'
                        data-test='link'
                        onChange={handleForm}
                        value={externalLink}
                        disabled={isSubmitting}
                    />
                    <textarea
                        className="description-textarea"
                        type="text"
                        id='description'
                        placeholder=' Awesome article about #javascript'
                        name='description'
                        data-test='description'
                        rows="4" 
                        cols="50"
                        onChange={handleForm}
                        value={description}
                        disabled={isSubmitting}
                    />

                    <button 
                        type='submit' 
                        data-test='publish-btn'
                        disabled={isSubmitting}>{isSubmitting ? "Publishing..." : "Publish"}</button>
                </form>
            </FormContent>
        </PostFormContainer>
    )
}

const PostFormContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
`

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        button:focus,
        textarea:focus,
        input:focus {
        outline: none;
        }

        input, textarea{
            width: 100%;
            background: #EFEFEF;
            border-radius: 5px;
            border: none;
            margin-bottom: 5px;
        }        
        
        .link-input{        
            height: 30px;
        }

        .description-textarea{
            height: 66px;
        }

        button{
            width: 20%;
            height: 31px;
            color: #FFFFFF;
            background: #1877F2;
            border-radius: 5px;
            border: none;
        }
    }
`

const CustomerData = styled.div`
    display: flex;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;

        color: #707070;
    }
`