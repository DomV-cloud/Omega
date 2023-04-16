import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';

function CategorySelect({ selectedCategory, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    fetchData();
}, []);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
};

return (
    <motion.select
        value={selectedCategory}
        onChange={onChange}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {categories.map((category) => (
            <motion.option
                key={category.id}
                value={category.id}
                variants={itemVariants}
            >
                {category.name}
            </motion.option>
        ))}
    </motion.select>
    );

}

export default Categories;
