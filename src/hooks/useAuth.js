import React, { useState, useContext, createContext } from 'react';
import Cokie from 'js-cookie';
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
    const [user, setUser] = useState(null);
    const signIn = async (email, password) => {
        const options = {
            Headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };

        const { data: access_token } = await axios.post(endPonits.auth.login, { email, password }, options);
        console.log(access_token);
    };

    return {
        user,
        signIn,
    };
};