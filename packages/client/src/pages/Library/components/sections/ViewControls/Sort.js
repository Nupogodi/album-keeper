import React from 'react'

//constants 

import {SORT_TYPES} from 'util/constants';

//styles
import styles from './Sort.module.css';

const {album, year, artist} = SORT_TYPES;

const Sort = ({setSorted}) => {
    return (
        <div>
            <select onChange={(e) => setSorted(e.target.value)}>
                <option value={album}>Album Title</option>
                <option value={year}>Release Year</option>
                <option value={artist}>Artist Name</option>
            </select>
        </div>
    )
}

export default Sort
