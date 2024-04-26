import FiltersCSS from "./Filters.module.css";

const Filters = (props) => {
    const handleFilterClick = () => {
        if (props.onClick) {
            props.onClick(); // Call the onClick function passed from EventGallery
        }
    };

    return (
        <div className={FiltersCSS["filters"]}>
            <button className={FiltersCSS["filter"]} onClick={handleFilterClick}>{props.feature}</button>
        </div>
    );
};

export default Filters;
