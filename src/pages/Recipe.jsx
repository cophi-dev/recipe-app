import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=93712ede68c0465caa2e2a54207e7387`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div className="content">
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3>Instructions:</h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled(motion.div)`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  @media screen and (max-width: 1300px) {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .content {
    @media screen and (max-width: 1300px) {
      width: 90vw;
    }
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 2rem;
    margin-bottom: 3rem;
    @media screen and (max-width: 1300px) {
      width: 100vw;
      max-width: 30rem;
    }
  }

  h3 {
    font-size: 1rem;
    font-weight: normal;
    @media screen and (max-width: 1300px) {
      font-size: 1rem;
      font-weight: normal;
    }
  }
`;

const Button = styled.button`
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 1300px) {
    margin-right: 1rem;
    padding: 1rem;
  }
`;

const Info = styled.div`
  margin-left: 10rem;
  @media screen and (max-width: 1300px) {
    margin-left: 0rem;
  }
`;

export default Recipe;
