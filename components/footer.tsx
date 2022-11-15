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
    <button className={`${hide} px-2 py-1 font-bold text-white rounded-md bg-primary-400`}
      onClick={logout}>
      Logout
    </button>


  )

}
export default function Footer() {

  
  useEffect(() => {
    
  })
  
  const goToInsta = () => {document.location.href="https://www.instagram.com/muslimleaguect/"}
  const goToFacebook = () => {document.location.href="https://www.facebook.com/MuslimLeagueCT"}

  return (
    <footer className="border-t border-gray-100 max-auto bg-gray"> 
        <Container>
          <div className="flex justify-between w-20 pt-3 m-auto g-red"> 
            <button onClick={goToInsta}>
              <Iglogo className="w-[30px]"/>
            </button>
            <button onClick={goToFacebook}>
              <Fblogo className="w-[30px]"/>
            </button>
          </div>

            <h3 className="text-center">Muslim League CT est. 2020</h3>
           <div className="flex justify-between w-64 pb-1 m-auto">
            <NextLink href='/about'>
                <a className="font-bold text-primary"> About Us</a>
            </NextLink>
             <NextLink href='/policy'>
                <a className="font-bold text-primary"> Policy </a>
            </NextLink>
              <NextLink href='/contact'>
                <a className="font-bold text-primary"> Contact Us </a>
            </NextLink>
      
           </div>

         <div className="pb-5 text-center">
            <NextLink href='/admin'>
              <button className="px-2 py-1 mx-2 bg-black rounded-md">
                  <a className="font-bold text-white"> Admin </a>
              </button>
            </NextLink>
            <LogoutButton/>
         </div>
           
        </Container>
    </footer>
)
  
} 