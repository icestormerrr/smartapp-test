import React from 'react';
import classNames from 'classnames';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { TEXT_SIZE } from '../../constants/constants';
import './Header.scss';

interface HeaderProps {
  title: string;
  textSize?: string;
  isBack?: boolean;
  additionalIcons?: React.ReactElement;
  onClickBack?: () => void;
}

const Header = ({ title, textSize = TEXT_SIZE.small, isBack = false, additionalIcons, onClickBack }: HeaderProps) => (
  <div
    className={
      classNames({
        'header': true,
        'header__big-text-size': textSize === TEXT_SIZE.big,
      })
    }
  >
    <div className="header__title">
      {isBack && <Back onClick={onClickBack} />}
      <div>{title}</div>
    </div>
    <div className="header__additional-icons">
      {additionalIcons}
    </div>
  </div>
);

export default Header;