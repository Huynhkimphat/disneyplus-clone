import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { auth, provider } from '../firebase';
import {
  selectPhoto, selectUserName, setSignOutState, setUserLoginDetails,
} from '../features/user/userSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  // const email =useSelector(selectEmail);
  const photo = useSelector(selectPhoto);

  const setUser = (user) => {
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }));
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate('/home');
      } else {
        navigate('/');
      }
    });
  }, [username]);

  const handleAuth = () => {
    if (!username) {
      auth.signInWithPopup(provider)
        .then((res) => {
          setUser(res.user);
        })
      // eslint-disable-next-line no-alert
        .catch((e) => alert(e.message));
    } else {
      auth.signOut()
        .then(() => {
          dispatch(setSignOutState());
        })
      // eslint-disable-next-line no-alert
        .catch((e) => alert(e.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!username ? <Login onClick={handleAuth}>Login</Login> : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="search" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/original">
              <img src="/images/original-icon.svg" alt="ORIGINAL" />
              <span>ORIGINAL</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" alt="MOVIE" />
              <span>ORIGINAL</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={photo} alt={username} />
            <Dropdown>
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span onClick={handleAuth}>Sign Out</span>
            </Dropdown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  padding: 0;
  position: relative;
  margin: 0 auto 0 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &::before {
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: '';
        height: 2px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span::before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }

  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000000;
    border-color: transparent;
    cursor: pointer;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgba(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0 0 0 / 50%) 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 102px;
  opacity: 0;

`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50px;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
