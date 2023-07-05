import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import NewPost from './Post';
// import PostsComponent from './Possst';

function LandingPage({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

  return(<>
 <NewPost/>
 {/* <PostsComponent/> */}
  </>);
}

export default LandingPage;
























//  const conditionalRender = () => {
//    if (!isSearch && rendered === "upcoming") {
//      return upcomingAnime?.map((anime) => {
//        return (
//          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
//            <img src={anime.images.jpg.large_image_url} alt="" />
//          </Link>
//        );
//      });
//    } else {
//      return searchResults?.map((anime) => {
//        return (
//          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
//            <img src={anime.images.jpg.large_image_url} alt="" />
//          </Link>
//        );
//      });
//    }
//  };