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
        <div className="mt-5 border-t border-t-hueso/10 pt-7">
          <ul className="flex gap-8 md:justify-end">
            <li>
              <Link
                href="https://wa.me/5491168194422?text=Hola,%20vengo%20de%20la%20página%20web%20de%20la%20Iglesia%20Encuentro%20Canning"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_459_156)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.1211 12.6711C25.946 5.78862 20.2823 0.263672 13.305 0.263672C6.32765 0.263672 0.788113 5.66454 0.488876 12.4375C0.488876 12.62 0.474279 12.8098 0.474279 12.9922C0.474279 15.4007 1.14574 17.6486 2.31349 19.5681L-0.00012207 26.3995L7.10129 24.1443C8.94051 25.1515 11.0498 25.7281 13.2977 25.7281C20.3845 25.7281 26.1284 20.0279 26.1284 12.9995C26.1284 12.89 26.1284 12.7806 26.1284 12.6784L26.1211 12.6711Z"
                      fill="#6C8A8C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.1804 15.5695C18.8592 15.4163 17.3192 14.6572 17.0273 14.5551C16.7354 14.4456 16.531 14.4018 16.3194 14.7083C16.1077 15.0222 15.5019 15.7228 15.3195 15.9272C15.137 16.1388 14.9545 16.1607 14.6334 16.0074C14.3196 15.8542 13.3051 15.5258 12.1081 14.4602C11.1739 13.6354 10.539 12.6137 10.3638 12.3071C10.1813 11.9933 10.3492 11.8254 10.5025 11.6722C10.6484 11.5262 10.8163 11.3072 10.9769 11.1248C11.0207 11.0737 11.0572 11.0226 11.0936 10.9715C11.1666 10.8547 11.2177 10.7525 11.2907 10.5993C11.4002 10.3876 11.3418 10.2125 11.2688 10.0519C11.1885 9.89863 10.5609 8.35865 10.2981 7.73098C10.0427 7.10331 9.77262 7.21279 9.59016 7.21279C9.4077 7.21279 9.20334 7.18359 8.99169 7.18359C8.78003 7.18359 8.437 7.26388 8.15236 7.57041C7.86042 7.88425 7.05029 8.63599 7.05029 10.176C7.05029 10.5336 7.11598 10.8985 7.21086 11.2415C7.53199 12.3436 8.21075 13.2486 8.33482 13.4019C8.48809 13.6063 10.5098 16.8614 13.7065 18.1167C16.9105 19.3574 16.9105 18.9487 17.4871 18.8903C18.0637 18.8393 19.3482 18.1386 19.6037 17.4088C19.8664 16.6789 19.8664 16.0585 19.7934 15.9272C19.7131 15.8031 19.5015 15.7228 19.195 15.5695H19.1804Z"
                      fill="#242424"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_459_156">
                      <rect
                        width="26.1285"
                        height="26.1358"
                        fill="white"
                        transform="translate(0 0.263672)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/encuentrocanning/"
                target="_blank"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6284 0.831055C9.23266 0.831055 8.80645 0.845029 7.47192 0.907913C6.14439 0.970796 5.22908 1.18041 4.43954 1.48784C3.61507 1.80924 2.92336 2.23545 2.22465 2.92717C1.53294 3.61889 1.09974 4.31759 0.785321 5.14206C0.477891 5.93858 0.261294 6.8469 0.205398 8.17444C0.142515 9.50896 0.12854 9.93517 0.12854 13.3309C0.12854 16.7266 0.142515 17.1528 0.205398 18.4873C0.268281 19.8149 0.477891 20.7302 0.785321 21.5197C1.10673 22.3442 1.53294 23.0359 2.22465 23.7346C2.91637 24.4333 3.61507 24.8595 4.43954 25.1739C5.23607 25.4813 6.14439 25.691 7.47192 25.7538C8.80645 25.8167 9.23266 25.8307 12.6284 25.8307C16.0241 25.8307 16.4503 25.8167 17.7848 25.7538C19.1123 25.691 20.0276 25.4813 20.8172 25.1739C21.6416 24.8525 22.3334 24.4263 23.0321 23.7346C23.7308 23.0429 24.157 22.3442 24.4714 21.5197C24.7788 20.7232 24.9884 19.8149 25.0513 18.4873C25.1142 17.1528 25.1282 16.7266 25.1282 13.3309C25.1282 9.93517 25.1142 9.50896 25.0513 8.17444C24.9884 6.8469 24.7788 5.9316 24.4714 5.14206C24.15 4.31759 23.7238 3.62587 23.0321 2.92717C22.3403 2.23545 21.6416 1.80226 20.8172 1.48784C20.0207 1.18041 19.1123 0.970796 17.7848 0.907913C16.4503 0.845029 16.0241 0.831055 12.6284 0.831055Z"
                    fill="#6C8A8C"
                  />
                  <path
                    d="M12.6285 8C9.59426 8 7.12854 10.4597 7.12854 13.5C7.12854 16.5403 9.58828 19 12.6285 19C15.6688 19 18.1285 16.5403 18.1285 13.5C18.1285 10.4597 15.6688 8 12.6285 8Z"
                    fill="#242424"
                  />
                  <path
                    d="M20.8033 6.6653C20.8033 7.49676 20.1325 8.16751 19.301 8.16751C18.4696 8.16751 17.7988 7.49676 17.7988 6.6653C17.7988 5.83384 18.4696 5.16309 19.301 5.16309C20.1325 5.16309 20.8033 5.83384 20.8033 6.6653Z"
                    fill="#242424"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="mailto:info@encuentrocanning.org" target="_blank">
                <svg
                  width="34"
                  height="23"
                  viewBox="0 0 34 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.32043"
                    y="0.600586"
                    width="28.6154"
                    height="21.4615"
                    rx="2.11"
                    fill="#6C8A8C"
                  />
                  <path
                    d="M1.12817 4.45215L14.6589 13.0038C15.6164 13.6089 16.833 13.6232 17.8044 13.0408L32.1282 4.45215"
                    stroke="#242424"
                    stroke-width="2.18954"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com/@encuentrocanning/videos"
                target="_blank"
              >
                <svg
                  width="31"
                  height="22"
                  viewBox="0 0 31 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5017 4.11031C29.1563 2.81776 28.1362 1.80446 26.8511 1.46137C24.5137 0.831055 15.1242 0.831055 15.1242 0.831055C15.1242 0.831055 5.74263 0.831055 3.40528 1.46137C2.11211 1.80446 1.10006 2.82574 0.75468 4.11031C0.128174 6.44808 0.128174 11.3311 0.128174 11.3311C0.128174 11.3311 0.128174 16.214 0.75468 18.5518C1.10006 19.8444 2.12014 20.8577 3.40528 21.2007C5.74263 21.8311 15.1242 21.8311 15.1242 21.8311C15.1242 21.8311 24.5057 21.8311 26.8511 21.2007C28.1442 20.8577 29.1563 19.8364 29.5017 18.5518C30.1282 16.214 30.1282 11.3311 30.1282 11.3311C30.1282 11.3311 30.1282 6.44808 29.5017 4.11031ZM12.0559 15.7592V6.90286L19.8952 11.3311L12.0559 15.7592Z"
                    fill="#6C8A8C"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://open.spotify.com/show/7jYkC3fMVa8wJWQveIVguJ?si=243cbf0ed2ec4906"
                target="_blank"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4595 0C6.09511 0 0.128174 5.96694 0.128174 13.3313C0.128174 20.6956 6.09511 26.6626 13.4595 26.6626C20.8238 26.6626 26.7907 20.6956 26.7907 13.3313C26.7907 5.96694 20.8238 0 13.4595 0ZM19.5941 19.2633C19.3286 19.6615 18.8604 19.7943 18.4622 19.5288C15.332 17.5934 11.3983 17.1951 6.73093 18.2641C6.2628 18.3969 5.86454 18.0615 5.73178 17.6632C5.59903 17.1951 5.93441 16.7969 6.33267 16.6641C11.3983 15.5322 15.8001 16.0003 19.2657 18.1314C19.7338 18.334 19.7967 18.865 19.6011 19.2633H19.5941ZM21.1941 15.6021C20.8587 16.0702 20.2578 16.2658 19.7967 15.9374C16.1984 13.7365 10.7345 13.0728 6.52831 14.4073C5.99729 14.54 5.3964 14.2745 5.26365 13.7435C5.1309 13.2125 5.3964 12.6116 5.92742 12.4789C10.7904 11.0116 16.7923 11.7452 20.9286 14.2815C21.3269 14.4841 21.5295 15.1479 21.1941 15.616V15.6021ZM21.3269 11.871C17.0578 9.34168 9.931 9.06918 5.86454 10.3408C5.20077 10.5435 4.53001 10.1382 4.33437 9.5443C4.13175 8.88053 4.537 8.20978 5.1309 8.01414C9.86113 6.61673 17.6657 6.88224 22.5985 9.8168C23.1994 10.1522 23.395 10.9487 23.0666 11.5496C22.7313 12.0177 21.9347 12.2133 21.3339 11.885L21.3269 11.871Z"
                    fill="#6C8A8C"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
