
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import styled from "styled-components";
import PostForm from "../../comps/PostForm.js";
import { validToken } from "../../services/apiAuth.js";
import { LikeButton } from "../../comps/Like/Like.js";

export default function HomePage(){
    const navigate = useNavigate()

    useEffect(() => {
        async function validateToken(){
            try {
                const token = localStorage.getItem("token")
                await validToken({token})
            } catch (error) {
                navigate("/")
            }
        }
        
        validateToken()
    }, [])
    
    return(
        <HomePageContainer>
            <NavBar />
            <TimeLineContent>
                <h1>timeline</h1>
                <LikeButton />
                <PostForm />
                <h1>there are no posts yet</h1>
            </TimeLineContent>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #333333;

    h1{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`

const TimeLineContent = styled.div`
    margin-top: 120px;
    width: 50%;
`
