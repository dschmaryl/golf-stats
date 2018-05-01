import React from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left 0;
  width: 100%;
  height: 400px;
  margin-top: -260px;
`;

const LoginContainer = styled.div`
  max-width: 640px;
  min-width: 340px;
  margin: auto;
  padding: 0;
`;

const Header = styled.div`
  font-size: 44px;
`;

export function Login(props) {
  return (
    <LoginWrapper>
      <LoginContainer class="container">
        <Header class="row">
          <div class="col-xs-12">welcome</div>
        </Header>
        <div class="row">
          <div class="col-xs-12">name</div>
        </div>
        <div class="row">
          <div class="col-xs-12">password</div>
        </div>
      </LoginContainer>
    </LoginWrapper>
  );
}
