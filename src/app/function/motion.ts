export const pageAnimetion = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    exsit: { opacity: 1, y: 0 },
    transition: {
        duration: 0.5,
        ease: 'easeInOut',
    }
}

export const navAnimetion = {
    initial: {
        opacity: 0,
        y: -25,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        delay: 0.3,
        duration: 0.3,
        ease: 'easeIn',
    }
}

export const headerAnimetion = {
    initial: {
        opacity: 0,
        x: 25,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    transition: {
        delay: 0.6,
        duration: 0.5,
        ease: 'easeIn',
    }
}

export const inputSearchAnimetion = {
    initial: {
        opacity: 0,
        x: -25,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    transition: {
        delay: 0.6,
        duration: 0.5,
        ease: 'easeIn',
    }
}

export const changeCountry = {
    initial: {
        opacity: 0,
        y: -100,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {
            delay: 0.6,
            duration: 0.5,
            ease: 'easeIn',
        },
    },
}

export const currentText1Animetion = {
    initial: {
        opacity: 0,
        x: -50,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    transition: {
        delay: 0.3,
        duration: 0.5,
        ease: 'easeIn',
    }
}

export const currentText2Animetion = {
    initial: {
        opacity: 0,
        x: -50,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    transition: {
        delay: 0.6,
        duration: 0.5,
        ease: 'easeIn',
    }
};

// export const weekForcastAnimation = {
//     initial: { opacity: 0, scale: 0 },
//     animate: { opacity: 1, scale: 1 },
// };

// export const weekForcastTransition = (index: number): { duration: number, delay: number } => ({
//     duration: 0.45,
//     delay: index * 0.1,
// });

export const cardAnimation = {
    initial: { opacity: 0, scale: 0 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.8,  ease: 'easeIn' },
    viewport: { once: true }
};

export const headerAirAnimetion = {
    initial: {
        opacity: 0,
        y: 30,
    },
    whileInView: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.5,
        ease: 'easeIn',
    },
    viewport: { once: true }
}

export const cardAirRightAnimation = {
    initial: {
        opacity: 0,
        x: 20,
    },
    whileInView: {
        opacity: 1,
        x: 0,
    },
    transition: {
        duration: 0.5,
        ease: 'easeIn',
    },
    viewport: { once: true }
};

export const cardAirLeftAnimation = {
    initial: {
        opacity: 0,
        x: -20,
    },
    whileInView: {
        opacity: 1,
        x: 0,
    },
    transition: {
        duration: 1,
        ease: 'easeIn',
    },
    viewport: { once: true },
};