import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button"

const Home = () => {
  return (
    <div className="p-10">
      {/* Sección del banner */}
      <section
        className=" text-white py-20 flex flex-col items-center justify-center"
        style={{ backgroundImage: 'url("ruta-de-tu-imagen.jpg")', backgroundSize: 'cover' }}
      >
        <h1 className="text-4xl font-semibold mb-4">
          ¡Aprende y crece con Tutor Class!
        </h1>
        <p className="text-lg mb-8">
          Encuentra a los mejores tutores para alcanzar tus metas académicas.
        </p>
        <Button >
          Join now
        </Button>
      </section>

      {/* Sección de texto corto */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <p className="text-xl text-gray-700 p-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores culpa vero dolor, cum hic sint ea dignissimos, explicabo corrupti quisquam nemo nostrum quia pariatur! Velit, laboriosam quo, a quae quisquam suscipit expedita dignissimos ab voluptatem pariatur odit illum, error neque facilis ut. Saepe consequatur omnis quis, sed officiis numquam nihil nobis voluptatum alias, beatae optio, natus in. Porro rerum magnam animi, odio eius corporis eveniet amet accusantium. Maiores eveniet obcaecati nulla facilis ab corporis facere cum deleniti, est quos omnis dignissimos praesentium ea voluptatum assumenda, mollitia ullam voluptatibus quibusdam ad tempore magni suscipit aut explicabo. Eos modi officiis itaque veritatis.
          </p>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="py-16">
        <div className="container mx-auto text-center p-20">
          <h2 className="text-3xl font-semibold mb-8">blablabla</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Tutor 1</h3>
              <p className="text-gray-700">
                Experto en Matemáticas. Te ayudará a resolver cualquier problema
                matemático.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Tutor 2</h3>
              <p className="text-gray-700">
                Profesor de Ciencias. Ofrece tutorías en Biología, Química y
                Física.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Tutor 3</h3>
              <p className="text-gray-700">
                Experto en Idiomas. Aprende inglés, español, francés y más con
                él.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Sobre Nosotros" */}
      <section className=" py-16">
        <div className="container mx-auto flex items-center justify-center">
          <img
            src="img/uns.png"
            alt="Sobre Nosotros"
            className="w-1/2"
          />
          <div className="ml-8">
            <h2 className="text-3xl font-semibold mb-4">Sobre Nosotros</h2>
            <p className="text-gray-700">
              Tutor Class es una plataforma dedicada a conectar estudiantes con
              tutores de alta calidad. Nuestra misión es facilitar el proceso
              de aprendizaje y ayudar a los estudiantes a alcanzar su máximo
              potencial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
