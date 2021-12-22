import { useState } from 'react';
import axios from 'axios';

export const responseSuccess = (res, body) => {
    return new Promise((resolve, reject) => {
        resolve(
            axios.post("/api/user/google-login", {
                tokenId: res.tokenId , description: '', phone: '', location: '',
                resetLink: '', website: '', facebook: '',
                instagram: ''
            }).then((response) => {
                return response;
            }).catch(err => {
                console.log(err);
            })
        );
        reject(Error("Error Login with Googgle"));
    })
}

export const responseFailure = (res) => {
    console.log(res);
}

export const city = ["Port-au-Prince", "Carrefour", "Delma", "Pétion-Ville", "Cap-Haïtien", "Saint-Marc", "Gonaïves ", "Croix-des-bouquets", "Petit-Goâve", "Leogane", "Port-de-Paix", "Taba", "Verrettes", "Pétion-Ville", "Les Cayes", "Jacmel", "Jeremy", "Bombardopolis", "Fort-Liberté", "Miragoane"];

export const getDate = (res) => {
    const date = new Date(res);
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const day = date.getDate();
    const year = date.getFullYear();
    const getMonths = months[date.getMonth()];

    return `${day} ${getMonths} ${year}`;
}

export const data = [
    {
        title: 'Rechercher votre Embaucheur',
        text: "Recherchez votre meilleur comptable, soyez sélectif dans le choix d'un comptable, ne choisissez pas le mauvais pour votre travail.",
        iconName: 'search',
        icon: '#31C6AE',
        color: "rgba(49, 198, 174, 0.3)"
    },
    {
        title: 'Prendre Contact avec lui',
        text: "Créez un contrat d'embauche avec l'embaucheur de votre choix, avec différentes formules de contrat pour votre travail.",
        iconName: 'document',
        icon: '#ff7a59',
        color: 'rgba(255, 122, 89, 0.3)'
    },
    {
        title: 'Commençons à travailler',
        text: "Commencez à travailler avec l'embaucheur de votre choix, embauchez selon le contrat qui a été fait.",
        iconName: 'clipboard',
        icon: '#170f45',
        color: 'rgba(23, 15, 69, 0.3)'
    },
];

export const aboutData = [
    {
        id: 1,
        title: 'Publiez vos compétences',
        text: 'Publiez simplement vos compétences pour ce que vous savez faire comme profesionnel et recevez des offres compétitives des clients autour de vous.',
    },
    {
        id: 2,
        title: 'Recherchez le freelance parfait',
        text: 'Parcourez les profils de Freelancer.Comparez les propositions et sélectionnez la meilleure. Contacter votre Freelancer pour votre boulot.',
    },
]; 

export function useLocalStorage(key, initialValue) {
    const [store, setStore] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch(err) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStore({
                ...store,
                isLogged: true,
                user: value.user,
                token: value.token
            });
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(err) {
            console.error(err);
        }
    }

    return [store, setValue];
}

export const updateUser = (_id, data, dispatch, loggedAction) => {
    return new Promise(async (resolve, reject) => {
        resolve(
            await axios.put(`/api/user/update-user/${_id}`, data)
            .then(async () => {
                await axios.get(`/api/user/${_id}`)
                .then(user => {
                    console.log(user.data);
                    dispatch(loggedAction(user.data));
                    return user.data;
                }).catch(err => console.log(err));
            }).catch(err => console.log(err))
        );
        reject(Error("Une erreur s'est produite"));
    });
}

export const getAllJob = (jobValue, cityValue, setData) => {
    if(!jobValue && cityValue === 'Ville' | cityValue === '') {
        axios.get('/')
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err))
    } else if(jobValue && cityValue !== "Ville") {
        axios.get(`/api/job/search/${jobValue}/${cityValue}`)
        .then(res => {
            setData(res.data);
        }).catch(err => console.log(err));
    } else {
        axios.get(`/api/job/search/${jobValue}`)
        .then(res => {
            setData(res.data);
        }).catch(err => console.log(err));
    }
}