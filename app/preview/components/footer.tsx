'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

const mapEmbedCode =
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5866264193533!2d-58.51235886463723!3d-34.88144292619042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd76848809fd5%3A0xa4dcb81c015f76f2!2sIglesia%20el%20encuentro!5e0!3m2!1ses-419!2sar!4v1687666073992!5m2!1ses-419!2sar" width="100%" height="148" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

export default function Footer() {
  return (
    <footer className="py-10 bg-dark">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/2">
            <h3 className="mb-5 text-2xl font-bold font-pragmatica text-hueso">
              Dónde estamos:
            </h3>
            <div
              className="mb-2 overflow-hidden rounded"
              dangerouslySetInnerHTML={{ __html: mapEmbedCode }}
            />
            <Link
              href="https://maps.app.goo.gl/thmoWViy1H4Fr1tW6"
              className="text-sm font-black underline uppercase text-cel"
            >
              Hipocrates 3320, Canning, Buenos Aires
            </Link>
          </div>
          <div className="md:text-right md:w-1/2">
            <div className="mb-10">
              <h3 className="mb-5 text-2xl font-bold font-pragmatica text-hueso">
                Nuestras reuniones:
              </h3>
              <p className="mb-2 text-base font-medium uppercase text-cel">
                Reunión central - domingos 10 am
              </p>
              <p className="text-base font-medium uppercase text-cel">
                Reunión de oración - jueves 7 pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
