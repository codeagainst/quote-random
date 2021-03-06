import styled from "styled-components";
import Quote from "../components/Quote/Quote.js";
import RandomButton from "../components/RandomButton/RandomButton";
import AuthorName from "../components/AuthorName/AuhorName.js";
import { useState } from "react";
import Link from "next/link";

const HomeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 25px 100px;
  position: relative;
`;

export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState(data.data[0]);

  const newQuote = async () => {
    const res = await fetch(
      "https://quote-garden.herokuapp.com/api/v3/quotes/random"
    );
    const data = await res.json();
    setQuoteData(data.data[0]);
    setLoading(false);
  };
  return (
    <HomeWrapper>
      <RandomButton
        disabled={loading ? true : false}
        onClick={() => {
          newQuote();
          setLoading(true);
        }}
      />
      <div
        style={
          loading
            ? {
                opacity: "0.5",
                filter: "blur(2px)",
                transition: ".3s ease all",
              }
            : {}
        }
      >
        <Quote quoteText={quoteData.quoteText} />
        <Link href={"/author/" + quoteData.quoteAuthor.toLowerCase()}>
          <a
            onClick={() => {
              setLoading(true);
            }}
          >
            <AuthorName
              name={quoteData.quoteAuthor}
              genre={quoteData.quoteGenre}
              marginTop={"140px"}
              isLink={true}
            />
          </a>
        </Link>
      </div>
      <div style={{ marginTop: "50px" }}>
        created by CodeAgainst - devChallanges.io
      </div>
    </HomeWrapper>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://quote-garden.herokuapp.com/api/v3/quotes/random"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};