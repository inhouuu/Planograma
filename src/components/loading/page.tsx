'use client'
import './style.scss';

const loading = () => {

    return (
        <div className='loading'>
            <div id='titleLoading'>
                <div id='logoLoading'>
                    <svg width="85" height="49" viewBox="0 0 85 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1672_2473)">
                            <path d="M38.4977 0.5H23.675L0 24.5L23.675 48.5H38.4977L14.7211 24.5L38.4977 0.5Z" fill="url(#paint0_linear_1672_2473)" />
                            <path d="M46.25 0.5H61.0726L84.7477 24.5L61.0726 48.5H46.25L70.0266 24.5L46.25 0.5Z" fill="url(#paint1_linear_1672_2473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M60.7514 0.5H46.2356L40.6794 12.8424C40.9427 12.8247 41.2084 12.8158 41.4763 12.8158C46.1091 12.8158 50.1148 15.4952 52.0223 19.386L60.7514 0.5ZM44.4037 35.8695C43.468 36.1093 42.487 36.237 41.4763 36.237C37.7001 36.237 34.3404 34.4564 32.1941 31.6909L24.627 48.5H38.5658L44.4037 35.8695Z" fill="url(#paint2_linear_1672_2473)" />
                            <path d="M50.6768 9.58375H58.1164V39.4166H50.6768V36.2632C49.218 37.6523 47.7499 38.6579 46.2731 39.2795C44.8144 39.8827 43.2279 40.1843 41.5138 40.1843C37.6664 40.1843 34.3386 38.6944 31.5306 35.7148C28.7223 32.717 27.3184 28.997 27.3184 24.5548C27.3184 19.9484 28.6768 16.1736 31.3937 13.2305C34.1107 10.2876 37.411 8.81592 41.295 8.81592C43.082 8.81592 44.7595 9.15415 46.3277 9.83045C47.8961 10.507 49.3455 11.5215 50.6768 12.8741V9.58375ZM42.8268 15.7259C40.511 15.7259 38.5872 16.5484 37.0556 18.1936C35.5237 19.8204 34.758 21.9135 34.758 24.4727C34.758 27.0504 35.5329 29.1707 37.083 30.834C38.6511 32.4976 40.5747 33.3292 42.8542 33.3292C45.2063 33.3292 47.1576 32.5159 48.7072 30.8889C50.2574 29.2437 51.0324 27.0959 51.0324 24.4454C51.0324 21.8495 50.2574 19.7474 48.7072 18.1387C47.1576 16.53 45.1972 15.7259 42.8268 15.7259Z" fill="#09242C" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_1672_2473" x1="19.2488" y1="0.5" x2="19.2488" y2="48.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0FCAF0" />
                                <stop offset="1" stopColor="#4B84EC" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_1672_2473" x1="65.4989" y1="0.5" x2="65.4989" y2="48.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0FCAF0" />
                                <stop offset="1" stopColor="#4B84EC" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_1672_2473" x1="42.6893" y1="0.5" x2="42.6893" y2="48.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4B84EC" />
                                <stop offset="1" stopColor="#0FCAF0" stopOpacity="0" />
                            </linearGradient>
                            <clipPath id="clip0_1672_2473">
                                <rect width="84.8889" height="48" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <h1>Planograma</h1>
            </div>
            <div id='barLoad'></div>
        </div>
    )
}

export default loading;