import React from 'react';
import loginOffice from '@/assets/img/login-office.jpeg';
import loginOfficeDark from '@/assets/img/login-office-dark.jpeg';

const ImageSection: React.FC = () => (
  <div className="h-32 md:h-auto md:w-1/2">
    <img
      aria-hidden="true"
      className="object-cover w-full h-full dark:hidden"
      src={loginOffice}
      alt="Office"
    />
    <img
      aria-hidden="true"
      className="hidden object-cover w-full h-full dark:block"
      src={loginOfficeDark}
      alt="Office"
    />
  </div>
);

export default ImageSection; 