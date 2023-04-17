/**
 * CategorySelect component allows the user to select a category from a list of options loaded from a remote API endpoint.
 * This component utilizes the useState and useEffect hooks from React to manage state and fetch data from the API.
 * It also uses the motion component from the Framer library to add animations to the dropdown menu.
 *
 * @param {number} selectedCategory - the currently selected category ID
 * @param {function} onChange - the function to call when a new category is selected
 * @returns {JSX.Element} - the CategorySelect component
 */
function CategorySelect({ selectedCategory, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * This useEffect hook is called when the component is mounted.
     * It fetches the list of categories from the remote API and updates the state accordingly.
     */
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

    /**
     * These Framer motion variants define the animations for the select menu and its options.
     */
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

    /**
     * This JSX element renders the select menu with the categories fetched from the API.
     * The options are animated using the Framer motion component and the defined variants.
     */
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

CategorySelect.propTypes = {
    selectedCategory: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CategorySelect;
