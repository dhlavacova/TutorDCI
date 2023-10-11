import React, { useEffect, useState } from "react";
import { ButtonLink } from "../components/ui"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="px-10 py-30 ">
      {/* Sección de la izquierda */}
      <section
        className="text-white py-20 w-1/2 float-left mt-40 "
        style={{ backgroundImage: 'url("")', backgroundSize: 'cover' }}
      >
        <h1 className="text-8xl font-semibold mb-4 font-mono text-black">
          Learn and Grow with D&OS!
        </h1>
        <p className="text-lg mb-8 text-slate-100">
          Encuentra a los mejores tutores para alcanzar tus metas académicas.
        </p>

        <ButtonLink  >
          <Link to="/register">Get Started </Link>

        </ButtonLink>


      </section>

      {/* Sección de la derecha */}
      <section className="py-40 w-1/2 float-right">
        <div className="container  text-right">
          <img
            src="img/isometric-vr-game-headset.gif" // Reemplaza "ruta_de_tu_imagen.jpg" con la ruta de tu imagen
            alt="Descripción de la imagen"
            className="w-full max-h-100" // Ajusta las clases de Tailwind CSS según tus necesidades
          />
        </div>
      </section>


      <div className="clear-both"></div> {/* Limpiar el float */}

      {/* Sección de texto corto */}
      <section className="py-30 w-1/2 float-left">
        <div className="container  text-right">
          <img
            src="img/optimal.png" // Reemplaza "ruta_de_tu_imagen.jpg" con la ruta de tu imagen
            alt="Descripción de la imagen"
            className="w-full max-h-100" // Ajusta las clases de Tailwind CSS según tus necesidades
          />
        </div>
      </section>
      <section className="w-1/2 float-right">
        <div className=" mx-auto py-40 ">

          <h1 className="text-5xl font-bold text-gray-100  font-mono pb-10">
            Unlock Your Potential with D&OS Web Development Tutors
          </h1>
          <p className="text-xl text-gray-100 px-30  ">
            "D&OS is a community of web development tutors that focuses on providing an exceptional learning experience. Located remotely, our tutors are available to offer guidance and support at any time. If you are looking to enhance your skills in web development or marketing, D&OS is the perfect choice for you. Our community is dedicated to helping students reach their full potential and become successful web developers. Join us today!"
          </p>
        </div>
      </section>

  <div className="clear-both"></div> {/* Limpiar el float */}  


      <section className=" py-60 text-gray-100">
        <div className="container mx-auto flex items-center justify-center">
          {/* <img
            src="img/uns.png"
            alt="Sobre Nosotros"
            className="w-1/2"
          /> */}
          <div className="ml-8">
            <h2 className="text-5xl font-semibold font-mono mb-4">About us
            </h2>
            <p className=" text-gray-100 text-xl">
              Welcome to D&OS, the premier Web Development class tutor community. We are a remote-based team of experienced professionals dedicated to providing top-notch web development education and support. Our mission is to empower aspiring developers with the knowledge and skills needed to succeed in the ever-evolving world of web development.
              At D&OS, we believe in the power of education and collaboration. Our team of expert tutors is passionate about helping students unlock their full potential and achieve their goals. Whether you're a beginner or an experienced developer looking to expand your skillset, we offer a wide range of comprehensive courses and resources tailored to meet your needs. Join our community today and take your web development journey to the next level!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
