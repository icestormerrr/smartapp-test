import React from 'react';
import { useSelector } from 'react-redux';
import { getMainLoader } from '../../redux/selectors/ui';
import { ApplicationState } from '../../types/reducers';
import './MainLoader.scss';

const MainLoader = () => {
  const mainLoader = useSelector<ApplicationState, boolean>(getMainLoader);

  if (!mainLoader) {
    return null;
  }

  return (
    <div className="main-loader">
      <div className="main-loader__spinner">
        {[...Array(4)].map((num, index) => <div key={index} />)}
      </div>
    </div>
  );
};

export default MainLoader;