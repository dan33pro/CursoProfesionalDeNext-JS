import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPonits from '@services/api/';

const AuthContext = createContext();

export const ProviderAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const [failLogin, setFailLogin] = useState(false);
    const failLoginController = (estado) => {
        setFailLogin(estado);
    };
    
    const [user, setUser] = useState(null);
    const signIn = async (email, password) => {
        const options = {
            Headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };

        const { data: access_token } = await axios.post(endPonits.auth.login, { email, password }, options);
        if (access_token) {
            const token = access_token.access_token;
            Cookie.set('token', token, { expires: 5 });

            axios.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user } = await axios.get(endPonits.auth.profile);
            console.log(user);
            setUser(user);
        }
    };

    return {
        user,
        signIn,
        failLogin,
        failLoginController,
    };
};