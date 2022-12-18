import React, { useEffect, useState } from "react";

import NextLink from 'next/link';

import Container from "./container";
import { useAuth } from "../context/AuthContext";

import Cookie from "js-cookie";

import Fblogo from '../public/svgs/facebook.svg'
import Iglogo from '../public/svgs/instagram.svg'

function LogoutButton() {

  const [hide,setHide] =  useState<string>('hidden')
  const { logout } = useAuth();
  const token = Cookie.get('token');
  useEffect(() => {
    if(token){
      setHide('')    
    } else {
      setHide('hidden')
    }
  },[token,hide])
 
  return (
    <button className={`${hide} px-2 py-1  mt-2 font-bold text-sm text-white rounded-md bg-secondary`}
      onClick={logout}>
      Logout
    </button>


  )

}
export default function Footer() {

  
  const goToInsta = () => {window.open("https://www.instagram.com/muslimleaguect/")}
  const goToFacebook = () => {window.open("https://www.facebook.com/MuslimLeagueCT")}

  return (
    <footer className="border-t pt-5 border-gray-100 max-auto"> 

        <Container>
           <div className="flex justify-between  text-sm w-80 mb-1 m-auto">
            <NextLink href='/about'>
                <a className="font-bold text-primary"> About Us</a>
            </NextLink>
            <NextLink href='/contact'>
               <a className="font-bold text-primary"> Contact </a>
            </NextLink>
             <NextLink href='/policy'>
                <a className="font-bold text-primary"> Policy </a>
            </NextLink>
            <NextLink href='/admin'>
                <a className="font-bold text-primary"> Admin </a>
            </NextLink>

           </div>

          <h3 className="text-center text-sm">Muslim League CT est. 2020</h3>

          <div className="flex justify-between w-16 mt-1 m-auto g-red"> 
            <button onClick={goToInsta}>
              <Iglogo className="w-6"/>
            </button>
            <button onClick={goToFacebook}>
              <Fblogo className="w-6"/>
            </button>
          </div>

         <div className="pb-5 text-center">
            <LogoutButton/>
         </div>
           
        </Container>
    </footer>
)
  
} 