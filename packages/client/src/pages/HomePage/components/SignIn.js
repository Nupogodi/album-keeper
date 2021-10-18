import React, {useContext, useState} from 'react'
import GlobalContext from 'context/GlobalContext/GlobalContext'

import styles from './SignIn.module.css';

const SignIn = () => {

    const globalContext = useContext(GlobalContext);

    return (
        <div>
            <form className={styles.form}>

            </form>
        </div>
    )
}

export default SignIn
