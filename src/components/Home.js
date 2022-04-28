import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import Original from './Original';
import Trending from './Trending';
import NewDisney from './NewDisney';
import db from '../firebase';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

function Home() {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];

  useEffect(() => {
    db.collection('movies').onSnapshot((snapshot) => {
      // eslint-disable-next-line array-callback-return
      // if (recommends.length === 4) {
      //   return;
      // }
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        // eslint-disable-next-line default-case
        switch (doc.data().type) {
          case 'recommend':
            if (recommends.some((res) => res.id === doc.id)) {
              break;
            }
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case 'new':
            if (newDisneys.some((res) => res.id === doc.id)) {
              break;
            }
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case 'original':
            if (originals.some((res) => res.id === doc.id)) {
              break;
            }
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case 'trending':
            if (trendings.some((res) => res.id === doc.id)) {
              break;
            }
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trendings,
        }),
      );
    });
  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Original />
      <Trending />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
    no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
