import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../comps/NavBar/NavBar.jsx";
import axios from "axios";
import styled from "styled-components";
import PostForm from "../../comps/PostForm.js";
import PostsContainer from "../../comps/Posts/PostsContainer.js";
import { validToken } from "../../services/apiAuth.js";
import { SearchInput } from "../../comps/SearchInput/SearchInput.jsx";
import Trendings from "../../comps/Hashtags/index.js";

export default function HomePage() {
  const [updatePost, setUpdatePost] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);
  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function validateToken() {
      try {
        await validToken({ token });
      } catch (error) {
        navigate("/");
      }
    }

    validateToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const BASE_URL = process.env.REACT_APP_API_URL;
    const URL = `${BASE_URL}/trendding`;
    const promise = axios.get(URL, config);

    promise.then((res) => {
      const { data } = res;
      setHashtagsList([...data]);
    });

    promise.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [updatePost]);

  function buildTrendings() {
    if (hashtagsList.length > 0) {
      return hashtagsList.map((hashtag) => {
<<<<<<< HEAD
        return (
          <Trendings
            key={hashtag.hashtags}
            hashtag={hashtag.hashtags}
          />
        );
=======
        return <Trendings key={hashtag.id} hashtag={hashtag.hashtags} />;
>>>>>>> main
      });
    } else {
      return <p>there are no trendings yet!</p>;
    }
  }
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <NavBar />
      <HomePageContainer>
        <TimeLineContent>
          <Feed>
            <h1>timeline</h1>
            <PostForm updatePost={updatePost} setUpdatePost={setUpdatePost} />
            <PostsContainer updatePost={updatePost} />
          </Feed>
          <TrendingsContainer>
            <Title>
              <h1>trending</h1>
            </Title>
            <Container>{buildTrendings()}</Container>
          </TrendingsContainer>
        </TimeLineContent>
      </HomePageContainer>
    </>
  );
}

const HomePageContainer = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  background-color: #333333;
`;

const TimeLineContent = styled.div`
  display: flex;
  gap: 25px;
  margin-top: ${window.innerWidth <= 600 ? "50px" : "120px"};
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 0;
  }
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-bottom: 43px;
    @media (max-width: 600px) {
      margin-bottom: 19px;
      margin-top: 49px;
      padding-left: 17px;
    }
  }
`;

const TrendingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 61px;
  width: 301px;
  background-color: #171717;
  border-start-start-radius: 25px;
  border-start-end-radius: 25px;
  border-bottom: solid 1px #484848;
  margin-top: 103px;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
  }
`;

const Container = styled.div`
  background-color: #171717;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;
  padding: 10px;
`;
